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
        @inject(TYPES.ResolveCache) private readonly resolveCache: ResolveRepository,
    ) {
        this.collection = db.collection('urls');
    }

    async get(short: string): Promise<Resolve | null> {
        let resolve: Resolve = await this.resolveCache.get(short);
        if (resolve !== null) {
            return resolve;
        };

        const dbResult = await this.collection.findOne({ short });
        if (dbResult === null) {
            return null;
        }

        resolve = this.dataMapper.toDomain(dbResult);
        this.resolveCache.set(resolve);

        return resolve;
    }

    async set(url: Resolve): Promise<void> {
        throw new Error("This function is not intended to be called");
    }
}
