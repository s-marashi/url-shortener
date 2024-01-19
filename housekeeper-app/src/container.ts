import { AsyncContainerModule, interfaces } from "inversify";
import { TYPES } from "./TYPES";
import { config } from "./config/main";
import { Db } from "mongodb";
import { createMongodbConnection } from "./infrastructure/connectors/mongoDb";
import { Channel } from "amqplib/callback_api";
import { createRabbitmqConnection } from "./infrastructure/connectors/rabbitmqConnection";
import { InMemoryResolveTrackRepository } from "./infrastructure/resolveTrack/InMemoryResolveTrackRepository";
import { ResolveTrackRepository } from "./domain/resolveTrack/ResolveTrackRepository";
import { UrlResolvedQueue } from "./domain/urlResolved/UrlResolvedQueue";
import { UrlResolvedDataMapper } from "./infrastructure/urlResolved/UrlResolvedDataMapper";
import { RabbitmqUrlResolvedQueue } from "./infrastructure/urlResolved/RabbitmqUrlResolvedQueue";
import { ResolveTrackApplication } from "./application/ResolveTrackApplication";
import { UrlApplication } from "./application/UrlApplication";
import { UrlRepository } from "./domain/url/UrlRepository";
import { UrlDataMapper } from "./infrastructure/url/UrlDataMapper";
import { MongoUrlRepository } from "./infrastructure/url/MongoUrlRepository";


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

    // Rabbitmq
    const messageQueue: Channel = await createRabbitmqConnection(
        config.RABBITMQ_USER,
        config.RABBITMQ_PASSWORD,
        config.RABBITMQ_HOST,
        config.RABBITMQ_PORT,
    );
    bind<Channel>(TYPES.MessageQueue).toConstantValue(messageQueue);

    // ResolveTracker
    bind<ResolveTrackApplication>(TYPES.ResolveTrackApplication).to(ResolveTrackApplication).inSingletonScope();
    bind<ResolveTrackRepository>(TYPES.ResolveTrackRepository).to(InMemoryResolveTrackRepository).inSingletonScope();

    // UrlResolved
    bind<UrlResolvedQueue>(TYPES.UrlResolvedQueue).to(RabbitmqUrlResolvedQueue).inSingletonScope();
    bind<UrlResolvedDataMapper>(TYPES.UrlResolvedDataMapper).to(UrlResolvedDataMapper).inSingletonScope();

    // Url
    bind<UrlApplication>(TYPES.UrlApplication).to(UrlApplication).inSingletonScope();
    bind<UrlRepository>(TYPES.UrlRepository).to(MongoUrlRepository).inSingletonScope();
    bind<UrlDataMapper>(TYPES.UrlDataMapper).to(UrlDataMapper).inSingletonScope();
});
