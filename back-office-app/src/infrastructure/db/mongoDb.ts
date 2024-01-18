import { Db, MongoClient, MongoClientOptions } from "mongodb";

export const createMongodbConnection = async (
    host: string,
    dbName: string,
    options?: MongoClientOptions
): Promise<Db> => {
    const client: MongoClient = await MongoClient.connect(host, options);

    return client.db(dbName);
}
