import { Statistics } from "../../domain/statistics/Statistics";
import { StatisticsQueue } from "../../domain/statistics/StatisticsQueue";
import { inject, injectable } from "inversify";
import { TYPES } from "../../TYPES";
import { Channel } from "amqplib";
import { StatisticsDataMapper } from "./StatisticsDataMapper";

@injectable()
export class RabbitmqStatisticsQueue implements StatisticsQueue {
    private readonly QueueStatistics: string = "queue_statistics";

    constructor(
        @inject(TYPES.MessageQueue) private readonly messageQueue: Channel,
        @inject(TYPES.StatisticsDataMapper) private readonly dataMapper: StatisticsDataMapper,
    ) {
        this.messageQueue.assertQueue(
            this.QueueStatistics,
            { durable: true }
        );
    }

    async push(statistics: Statistics): Promise<void> {
        await this.messageQueue.sendToQueue(
            this.QueueStatistics,
            this.dataMapper.toDalEntity(statistics),
        );
    }
}
