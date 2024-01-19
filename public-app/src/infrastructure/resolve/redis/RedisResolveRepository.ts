import { inject, injectable } from "inversify";
import { Resolve } from "../../../domain/resolve/Resolve";
import { ResolveRepository } from "../../../domain/resolve/ResolveRepository";
import { TYPES } from "../../../TYPES";
import { RedisClientType } from "redis";
import { RedisResolveDataMapper } from "./RedisResolveDataMapper";

@injectable()
export class RedisResolveRepository implements ResolveRepository {
    private readonly REDIS_SHORT_PREFIX: string = 'short:';

    constructor(
        @inject(TYPES.Cache) private readonly redis: RedisClientType,
        @inject(TYPES.RedisResolveDataMapper) private readonly dataMapper: RedisResolveDataMapper
    ) { }

    private makeKey(short: string): string {
        return `${this.REDIS_SHORT_PREFIX}:${short}`
    }

    async get(short: string): Promise<Resolve | null> {
        const long: string = await this.redis.get(this.makeKey(short));
        if (long === null) {
            return null;
        }
        console.log(`got a value from redis: ${long}`);

        return this.dataMapper.toDomain({short, long});
    }

    async set(resolve: Resolve): Promise<void> {
        const result = await this.redis.set(this.makeKey(resolve.short), resolve.long);
        console.log(result);
    }
}
