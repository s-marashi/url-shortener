import { StatisticsQueue } from "../domain/statistics/StatisticsQueue";
import { TYPES } from "../TYPES";
import { Resolve } from "../domain/resolve/Resolve";
import { inject, injectable } from "inversify";
import { Statistics } from "../domain/statistics/Statistics";

@injectable()
export class StatisticsApplication {
    constructor(
        @inject(TYPES.StatisticsQueue) private readonly statisticsQueue: StatisticsQueue,
    ) {}

    async send(resolve: Resolve): Promise<void> {
        await this.statisticsQueue.push(Statistics.createFromResolve(resolve));
    }
}
