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
import { UserRepository } from "./domain/user/UserRepository";
import { MongoUserRepository } from "./infrastructure/user/MongoUserRepository";
import { UserDataMapper } from "./infrastructure/user/UserDataMapper";
import { UnusedUrlCleanupApplication } from "./application/UnusedUrlCleanupApplication";


export const asyncContainer = new AsyncContainerModule(async (bind: interfaces.Bind) => {
    // Mongodb
    const mongoUri = `mongodb://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}:${config.MONGO_PORT}`
    const db: Db = await createMongodbConnection(mongoUri, config.MONGODB_NAME);
    bind<Db>(TYPES.Db).toConstantValue(db);

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

    // User
    bind<UserRepository>(TYPES.UserRepository).to(MongoUserRepository).inSingletonScope();
    bind<UserDataMapper>(TYPES.UserDataMapper).to(UserDataMapper).inSingletonScope();

    // UrlCleanUp
    bind<UnusedUrlCleanupApplication>(TYPES.UnusedUrlCleanupApplication).to(UnusedUrlCleanupApplication).inSingletonScope();
});
