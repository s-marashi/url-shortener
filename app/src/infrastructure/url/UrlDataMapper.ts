import { injectable } from "inversify";
import { DataMapper } from "../../domain/DataMapper";
import { Url } from "../../domain/url/Url";

@injectable()
export class UrlDataMapper implements DataMapper<Url>
{
    toDomain(dalEntity: any): Url {
        return null;
    }

    toDalEntity(url: Url): any {
        return null;
    }
}
