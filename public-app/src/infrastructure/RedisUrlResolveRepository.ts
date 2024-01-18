import { Url } from "../domain/resolve/Url";
import { UrlResolveRepository } from "../domain/resolve/UrlResolveRepository";

export class RedisUrlResolveRepository implements UrlResolveRepository {
    async get(short: string): Promise<Url | null> {
        return null;
    }

    async set(url: Url): Promise<void> {
        return;
    }
}
