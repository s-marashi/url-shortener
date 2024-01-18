import { injectable } from "inversify";
import { DataMapper } from "../../domain/DataMapper";
import { Statistics } from "../../domain/statistics/Statistics";

@injectable()
export class StatisticsDataMapper implements DataMapper<Statistics>
{
    toDomain(dalEntity: any): Statistics {
        return new Statistics(
            dalEntity.long,
            dalEntity.short,
            dalEntity.lastVisitedAt,
            dalEntity.visitCount,
        );
    }

    toDalEntity(statistics: Statistics): any {
        throw Error("this function is not intended to be called");
    }
}
