import { Url } from "../domain/Url";
import { UrlResolveRepository } from "../domain/UrlResolveRepository";

export class MongoUrlResolveRepository implements UrlResolveRepository {
    async get(short: string): Promise<Url | null> {
        return null;
    }

    async set(short: string, long: string): Promise<void> {
        return;
    }
}
