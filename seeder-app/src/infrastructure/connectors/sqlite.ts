import "reflect-metadata"
import { DataSource } from "typeorm"
import { SeedEntity } from "../seed/SeedEntity"

export const createSqliteConnection = async (dbpath: string):Promise<void> => {
    const dataSource = new DataSource({
        type: "sqlite",
        database: dbpath,
        entities: [SeedEntity],
        synchronize: true,
        logging: false,
    });

    const a = await dataSource.initialize();
    console.log(a);
}
