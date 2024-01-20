import { AsyncContainerModule, interfaces } from "inversify";
import { config } from "./config/main";
import { createSqliteConnection } from "./infrastructure/connectors/sqlite";
import { SeedingApplication } from "./application/SeedingApplication";
import { TYPES } from "./TYPES";
import { SeedRepository } from "./domain/seed/SeedRepository";
import { SqliteSeedRepository } from "./infrastructure/seed/SqliteSeedRepository";
import { SeedCounterRepository } from "./domain/seedCounter/SeedCounterRepository";
import { SqliteSeedCounterRepository } from "./infrastructure/seedCounter/SqliteSeedCounterRepository";
import { DataSource } from "typeorm";


export const asyncContainer = new AsyncContainerModule(async (bind: interfaces.Bind) => {
    // Sqlite
    const db: DataSource = await createSqliteConnection("./data/seed.db");
    bind<DataSource>(TYPES.Db).toConstantValue(db);

    bind<SeedingApplication>(TYPES.SeedingApplication).to(SeedingApplication).inSingletonScope();
    bind<SeedRepository>(TYPES.SeedRepository).to(SqliteSeedRepository);

    bind<SeedCounterRepository>(TYPES.SeedCounterRepository).to(SqliteSeedCounterRepository);
});
