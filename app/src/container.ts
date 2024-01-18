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
import { UrlApplication } from "./application/UrlApplication";
import { UrlRepository } from "./domain/url/UrlRepository";
import { MongoUrlRepository } from "./infrastructure/url/MongoUrlRepository";
import { UrlDataMapper } from "./infrastructure/url/UrlDataMapper";
import { ShortUrlProvider } from "./domain/url/ShortUrlProvider";
import { ApiShortUrlProvider } from "./infrastructure/url/ApiShortUrlProvider";


export const asyncContainer = new AsyncContainerModule(async(bind: interfaces.Bind) => {
    // Mongodb
    const db: Db = await createMongodbConnection(config.MONGODB_URI, config.MONGODB_NAME);
    bind<Db>(TYPES.Db).toConstantValue(db);

    // Middleware
    bind<RequestValidator>(TYPES.RequestValidator).to(RequestValidator);
    bind<TokenValidator>(TYPES.TokenValidator).to(TokenValidator);
    
    // User
    bind<UserApplication>(TYPES.UserApplication).to(UserApplication).inSingletonScope();
    bind<UserRepository>(TYPES.UserRepository).to(MongoUserRepository).inSingletonScope();
    bind<UserDataMapper>(TYPES.UserDataMapper).to(UserDataMapper).inSingletonScope();

    // Url
    bind<UrlApplication>(TYPES.UrlApplication).to(UrlApplication).inSingletonScope();
    bind<UrlRepository>(TYPES.UrlRepository).to(MongoUrlRepository).inSingletonScope();
    bind<UrlDataMapper>(TYPES.UrlDataMapper).to(UrlDataMapper).inSingletonScope();
    bind<ShortUrlProvider>(TYPES.ShortUrlProvider).to(ApiShortUrlProvider).inSingletonScope();
});
