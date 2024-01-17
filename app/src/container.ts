import { AsyncContainerModule, interfaces } from "inversify";
import { UserRepository } from "./domain/user/UserRepository";
import { TYPES } from "./TYPES";
import { config } from "./config/main";
import { MongoUserRepository } from "./infrastructure/user/MongoUserRepository";
import { Db } from "mongodb";
import { createMongodbConnection } from "./infrastructure/db/mongoDb";
import { UserDataMapper } from "./infrastructure/user/UserDataMapper";
import { UserApplication } from "./application/UserApplication";
import { RequestValidator } from "./controllers/middleware/RequestValidator";
import { TokenValidator } from "./controllers/middleware/TokenValidator";

export const asyncContainer = new AsyncContainerModule(async(bind: interfaces.Bind) => {
    // Mongodb
    const db: Db = await createMongodbConnection(config.MONGODB_URI, config.MONGODB_NAME);
    bind<Db>(TYPES.Db).toConstantValue(db);

    // Middleware
    bind<RequestValidator>(TYPES.RequestValidator).to(RequestValidator);
    bind<TokenValidator>(TYPES.TokenValidator).to(TokenValidator);
    
    // User
    bind<UserApplication>(TYPES.UserApplication).to(UserApplication);
    bind<UserRepository>(TYPES.UserRepository).to(MongoUserRepository)
    bind<UserDataMapper>(TYPES.UserDataMapper).to(UserDataMapper);
});
