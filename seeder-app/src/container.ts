import { AsyncContainerModule, interfaces } from "inversify";
import { config } from "./config/main";
import { createSqliteConnection } from "./infrastructure/connectors/sqlite";


export const asyncContainer = new AsyncContainerModule(async (bind: interfaces.Bind) => {
    // Sqlite
    await createSqliteConnection("./data/seed.db");
    // bind<Db>(TYPES.Db).toConstantValue(db);



});
