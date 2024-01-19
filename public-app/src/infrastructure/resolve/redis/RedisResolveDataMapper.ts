import { injectable } from "inversify";
import { DataMapper } from "../../DataMapper";
import { Resolve } from "../../../domain/resolve/Resolve";

@injectable()
export class RedisResolveDataMapper implements DataMapper<Resolve>
{
    toDomain(dalEntity: any): Resolve {
        return new Resolve(
            dalEntity.short,
            dalEntity.long
        );
    }

    toDalEntity(resolve: Resolve): any {
        return {
            short: resolve.short,
            long: resolve.long,
        }
    }
}
