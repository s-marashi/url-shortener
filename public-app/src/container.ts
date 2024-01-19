import { AsyncContainerModule, interfaces } from "inversify";
import { TYPES } from "./TYPES";
import { config } from "./config/main";
import { Db } from "mongodb";
import { createMongodbConnection } from "./infrastructure/db/mongoDb";
import { RequestValidator } from "./controllers/middleware/RequestValidator";
import { ResolveController } from "./controllers/ResolveController";
import { ResolveApplication } from "./application/ResolveApplication";
import { ResolveRepository } from "./domain/resolve/ResolveRepository";
import { RedisResolveRepository } from "./infrastructure/resolve/redis/RedisResolveRepository";
import { MongoResolveRepository } from "./infrastructure/resolve/mongo/MongoResolveRepository";
import { StatisticsApplication } from "./application/StatisticsApplication";
import { MongoResolveDataMapper } from "./infrastructure/resolve/mongo/MongoResolveDataMapper";
import { RedisResolveDataMapper } from "./infrastructure/resolve/redis/RedisResolveDataMapper";
import { RedisClientType } from "redis";
import { createRedisConnection } from "./infrastructure/db/redisConnection";


export const asyncContainer = new AsyncContainerModule(async (bind: interfaces.Bind) => {
    // Mongodb
    const db: Db = await createMongodbConnection(config.MONGODB_URI, config.MONGODB_NAME);
    bind<Db>(TYPES.Db).toConstantValue(db);

    // Redis
    console.log(
        config.REDIS_HOST,
        parseInt(config.REDIS_PORT),
        config.REDIS_PASSWORD
    );

    const cache: RedisClientType = await createRedisConnection(
        config.REDIS_HOST,
        parseInt(config.REDIS_PORT),
        config.REDIS_PASSWORD,
    );
    bind<RedisClientType>(TYPES.Cache).toConstantValue(cache);

    // Middleware
    bind<RequestValidator>(TYPES.RequestValidator).to(RequestValidator);

    bind<ResolveController>(TYPES.ResolveController).to(ResolveController).inSingletonScope();
    bind<ResolveApplication>(TYPES.ResolveApplication).to(ResolveApplication).inSingletonScope();

    bind<ResolveRepository>(TYPES.ResolveCache).to(RedisResolveRepository).inSingletonScope();
    bind<RedisResolveDataMapper>(TYPES.RedisResolveDataMapper).to(RedisResolveDataMapper).inSingletonScope();

    bind<ResolveRepository>(TYPES.ResolveDb).to(MongoResolveRepository).inSingletonScope();
    bind<MongoResolveDataMapper>(TYPES.MongoResolveDataMapper).to(MongoResolveDataMapper).inSingletonScope();

    bind<StatisticsApplication>(TYPES.StatisticsApplication).to(StatisticsApplication).inSingletonScope();
});
