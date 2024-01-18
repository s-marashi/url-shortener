import { injectable } from "inversify";
import { Resolve } from "../../../domain/resolve/Resolve";
import { ResolveRepository } from "../../../domain/resolve/ResolveRepository";

@injectable()
export class RedisResolveRepository implements ResolveRepository {
    async get(short: string): Promise<Resolve | null> {
        return null;
    }

    async set(resolve: Resolve): Promise<void> {
        return;
    }
}
