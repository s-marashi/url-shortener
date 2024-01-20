import { AsyncContainerModule, interfaces } from "inversify";
import { TYPES } from "./TYPES";
import { config } from "./config/main";
import { Db } from "mongodb";
import { createMongodbConnection } from "./infrastructure/connectors/mongoDb";
import { ResolveController } from "./controllers/ResolveController";
import { ResolveApplication } from "./application/ResolveApplication";
import { ResolveRepository } from "./domain/resolve/ResolveRepository";
import { RedisResolveRepository } from "./infrastructure/resolve/redis/RedisResolveRepository";
import { MongoResolveRepository } from "./infrastructure/resolve/mongo/MongoResolveRepository";
import { MongoResolveDataMapper } from "./infrastructure/resolve/mongo/MongoResolveDataMapper";
import { RedisResolveDataMapper } from "./infrastructure/resolve/redis/RedisResolveDataMapper";
import { RedisClientType } from "redis";
import { createRedisConnection } from "./infrastructure/connectors/redisConnection";
import { Channel } from "amqplib/callback_api";
import { createRabbitmqConnection } from "./infrastructure/connectors/rabbitmqConnection";
import { UrlResolvedQueue } from "./domain/urlResolved/UrlResolvedQueue";
import { RabbitmqUrlResolvedQueue } from "./infrastructure/urlResolved/RabbitmqUrlResolvedQueue";
import { UrlResolvedDataMapper } from "./infrastructure/urlResolved/UrlResolvedDataMapper";
import { ShortUrlValidator } from "./controllers/middleware/ShortUrlValidator";


export const asyncContainer = new AsyncContainerModule(async (bind: interfaces.Bind) => {
    // Mongodb
    const mongoUri = `mongodb://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}:${config.MONGO_PORT}`
    const db: Db = await createMongodbConnection(mongoUri, config.MONGODB_NAME);
    bind<Db>(TYPES.Db).toConstantValue(db);

    // Redis
    const cache: RedisClientType = await createRedisConnection(
        config.REDIS_HOST,
        parseInt(config.REDIS_PORT),
        null
    );
    bind<RedisClientType>(TYPES.Cache).toConstantValue(cache);

    // Rabbit
    const messageQueue: Channel = await createRabbitmqConnection(
        config.RABBITMQ_USER,
        config.RABBITMQ_PASSWORD,
        config.RABBITMQ_HOST,
        config.RABBITMQ_PORT,
    );
    bind<Channel>(TYPES.MessageQueue).toConstantValue(messageQueue);

    // Middleware
    bind<ShortUrlValidator>(TYPES.ShortUrlValidator).to(ShortUrlValidator);

    bind<ResolveController>(TYPES.ResolveController).to(ResolveController).inSingletonScope();
    bind<ResolveApplication>(TYPES.ResolveApplication).to(ResolveApplication).inSingletonScope();

    bind<ResolveRepository>(TYPES.ResolveCache).to(RedisResolveRepository).inSingletonScope();
    bind<RedisResolveDataMapper>(TYPES.RedisResolveDataMapper).to(RedisResolveDataMapper).inSingletonScope();

    bind<ResolveRepository>(TYPES.ResolveRepository).to(MongoResolveRepository).inSingletonScope();
    bind<MongoResolveDataMapper>(TYPES.MongoResolveDataMapper).to(MongoResolveDataMapper).inSingletonScope();

    bind<UrlResolvedQueue>(TYPES.UrlResolvedQueue).to(RabbitmqUrlResolvedQueue).inSingletonScope();
    bind<UrlResolvedDataMapper>(TYPES.UrlResolvedDataMapper).to(UrlResolvedDataMapper).inSingletonScope();
});
