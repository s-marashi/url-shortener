import { injectable } from "inversify";
import { DataMapper } from "../../DataMapper";
import { Resolve } from "../../../domain/resolve/Resolve";

@injectable()
export class MongoResolveDataMapper implements DataMapper<Resolve>
{
    toDomain(dalEntity: any): Resolve {
        return new Resolve(
            dalEntity.short,
            dalEntity.long,
        );
    }

    toDalEntity(resolve: Resolve): any {
        throw new Error("This function is not intended to be called");
    }
}
