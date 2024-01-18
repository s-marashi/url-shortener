import { injectable } from "inversify";
import { DataMapper } from "../../DataMapper";
import { Resolve } from "../../../domain/resolve/Resolve";

@injectable()
export class RedisResolveDataMapper implements DataMapper<Resolve>
{
    toDomain(dalEntity: any): Resolve {
        throw new Error("not implemented");
    }

    toDalEntity(resolve: Resolve): any {
        throw new Error("not implemented");
    }
}
