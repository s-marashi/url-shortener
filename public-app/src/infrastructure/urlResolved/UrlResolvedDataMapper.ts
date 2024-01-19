import { injectable } from "inversify";
import { DataMapper } from "../DataMapper";
import { UrlResolved } from "../../domain/urlResolved/UrlResolved";

@injectable()
export class UrlResolvedDataMapper implements DataMapper<UrlResolved>
{
    toDomain(dalEntity: any): UrlResolved {
        return new UrlResolved(
            dalEntity.short,
            dalEntity.timestamp,
        );
    }

    toDalEntity(statistics: UrlResolved): any {
        return Buffer.from(JSON.stringify(
            {
                short: statistics.short,
                timestamp: statistics.timestamp,
            }
        ));
    }
}
