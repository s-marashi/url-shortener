import { injectable, inject } from "inversify";
import { TYPES } from "../../TYPES";
import { Collection, Db, ObjectId } from "mongodb";
import { UrlRepository } from "../../domain/url/UrlRepository";
import { UrlDataMapper } from "./UrlDataMapper";
import { Url } from "../../domain/url/Url";

export @injectable()
class MongoUrlRepository implements UrlRepository {
    private collection: Collection;

    constructor(
        @inject(TYPES.Db) private readonly db: Db,
        @inject(TYPES.UrlDataMapper) private readonly dataMapper: UrlDataMapper,
    ) {
        this.collection = db.collection('urls');
    }

    async doesExists(long: string, userId: string): Promise<boolean> {
        const dbResult = await this.collection.findOne({
            userId: ObjectId.createFromHexString(userId),
            long: long
        });
        return !!dbResult;
    }

    async save(url: Url): Promise<Url> {
        const exists = await this.doesExists(url.getLong(), url.getUserId());
        if (!exists) {
            let dalEntity = this.dataMapper.toDalEntity(url);
            const dbResult = await this.collection.insertOne(this.dataMapper.toDalEntity(url));
            dalEntity["_id"] = dbResult.insertedId;

            return this.dataMapper.toDomain(dalEntity);
        }

        await this.collection.replaceOne(
            { _id: ObjectId.createFromHexString(url.getId()) },
            this.dataMapper.toDalEntity(url)
        );
        return url;
    }

    async findOneByLongAndUserId(long: string, userId: string): Promise<Url | null> {
        const dbResult = await this.collection.findOne({
            userId: ObjectId.createFromHexString(userId),
            long: long
        });

        if (dbResult === null) {
            return null;
        }

        return this.dataMapper.toDomain(dbResult);
    }

    async dropOneById(id: string): Promise<boolean> {
        const dbResult = await this.collection.deleteOne({ _id: ObjectId.createFromHexString(id) });
        if (dbResult.deletedCount !== 1) {
            return false;
        }

        return true;
    }

    async findOneByShort(short: string): Promise<Url | null> {
        const dbResult = await this.collection.findOne({ short });
        if (dbResult === null) {
            return null;
        }

        return this.dataMapper.toDomain(dbResult);
    }

    async findUrlsNotvisitedAfter(threshold: Date, count: number): Promise<Url[]> {
        const urls: Url[] = [];
        const cursor = this.collection.find({
            lastVisitedAt: { $lt: threshold }
        }).limit(count);

        for await (const dal of cursor) {            
            urls.push(this.dataMapper.toDomain(dal));
        }

        return urls;
    }
}
