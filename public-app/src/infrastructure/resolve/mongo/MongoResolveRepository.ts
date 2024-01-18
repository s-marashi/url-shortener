import { Collection, Db } from "mongodb";
import { Resolve } from "../../../domain/resolve/Resolve";
import { ResolveRepository } from "../../../domain/resolve/ResolveRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../TYPES";
import { MongoResolveDataMapper } from "./MongoResolveDataMapper";

@injectable()
export class MongoResolveRepository implements ResolveRepository {
    private collection: Collection;

    constructor(
        @inject(TYPES.Db) private readonly db: Db,
        @inject(TYPES.MongoResolveDataMapper) private readonly dataMapper: MongoResolveDataMapper,
    ) {
        this.collection = db.collection('urls');
    }

    async get(short: string): Promise<Resolve | null> {
        const dbResult = await this.collection.findOne({ short });
        if (dbResult === null) {
            return null;
        }

        return this.dataMapper.toDomain(dbResult);
    }

    async set(url: Resolve): Promise<void> {
        throw new Error("This function is not intended to be called");
    }
}
