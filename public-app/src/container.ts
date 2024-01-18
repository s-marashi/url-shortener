import { AsyncContainerModule, interfaces } from "inversify";
import { TYPES } from "./TYPES";
import { config } from "./config/main";
import { Db } from "mongodb";
import { createMongodbConnection } from "./infrastructure/db/mongoDb";
import { RequestValidator } from "./controllers/middleware/RequestValidator";
import { UrlResolveController } from "./controllers/UrlResolveController";
import { UrlResolveApplication } from "./application/UrlResolveApplication";
import { RedisUrlResolveRepository } from "./infrastructure/RedisUrlResolveRepository";
import { UrlResolveRepository } from "./domain/UrlResolveRepository";
import { MongoUrlResolveRepository } from "./infrastructure/MongoUrlResolveRepository";


export const asyncContainer = new AsyncContainerModule(async (bind: interfaces.Bind) => {
    // Mongodb
    const db: Db = await createMongodbConnection(config.MONGODB_URI, config.MONGODB_NAME);
    bind<Db>(TYPES.Db).toConstantValue(db);

    // Middleware
    bind<RequestValidator>(TYPES.RequestValidator).to(RequestValidator);

    bind<UrlResolveController>(TYPES.UrlResolveController).to(UrlResolveController).inSingletonScope();
    bind<UrlResolveApplication>(TYPES.UrlResolveApplication).to(UrlResolveApplication).inSingletonScope();
    bind<UrlResolveRepository>(TYPES.UrlResolveCache).to(RedisUrlResolveRepository).inSingletonScope();
    bind<UrlResolveRepository>(TYPES.UrlResolveDb).to(MongoUrlResolveRepository).inSingletonScope();
});
