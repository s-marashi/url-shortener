import { injectable, inject } from "inversify";
import { TYPES } from "../../TYPES";
import { Collection, Db } from "mongodb";
import { UrlRepository } from "../../domain/url/UrlRepository";
import { UrlDataMapper } from "./UrlDataMapper";

export @injectable()
class MongoUrlRepository implements UrlRepository {
    private collection: Collection;

    constructor(
        @inject(TYPES.Db) private readonly db: Db,
        @inject(TYPES.UrlDataMapper) private readonly dataMapper: UrlDataMapper
    ) {
        this.collection = db.collection('urls');
    }
}
