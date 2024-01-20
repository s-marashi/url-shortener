import "reflect-metadata"
import { DataSource } from "typeorm"
import { SeedEntity } from "../seed/SeedEntity"
import { SeedCounterEntity } from "../seedCounter/SeedCounterEntity";

export const createSqliteConnection = async (dbpath: string):Promise<DataSource> => {
    const dataSource = new DataSource({
        type: "sqlite",
        database: dbpath,
        entities: [SeedEntity, SeedCounterEntity],
        synchronize: true,
        logging: false,
    });

    return await dataSource.initialize();
}
