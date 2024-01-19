import { injectable } from "inversify";
import { DataMapper } from "../DataMapper";
import { Statistics } from "../../domain/statistics/Statistics";

@injectable()
export class StatisticsDataMapper implements DataMapper<Statistics>
{
    toDomain(dalEntity: any): Statistics {
        return new Statistics(
            dalEntity.short,
            dalEntity.timestamp,
        );
    }

    toDalEntity(statistics: Statistics): any {
        return Buffer.from(JSON.stringify(
            {
                short: statistics.short,
                timestamp: statistics.timestamp,
            }
        ));
    }
}
