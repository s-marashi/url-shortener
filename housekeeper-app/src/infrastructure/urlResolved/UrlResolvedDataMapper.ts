import { injectable } from "inversify";
import { DataMapper } from "../DataMapper";
import { UrlResolved } from "../../domain/urlResolved/UrlResolved";

@injectable()
export class UrlResolvedDataMapper implements DataMapper<UrlResolved>
{
    toDomain(dalEntity: any): UrlResolved {
        return JSON.parse((dalEntity as Buffer).toString()) as UrlResolved;
    }

    toDalEntity(urlResolved: UrlResolved): any {
        return Buffer.from(JSON.stringify(
            {
                short: urlResolved.short,
                timestamp: urlResolved.timestamp,
            }
        ));
    }
}
