import { UrlResolved } from "../../domain/urlResolved/UrlResolved";
import { UrlResolvedQueue } from "../../domain/urlResolved/UrlResolvedQueue";
import { inject, injectable } from "inversify";
import { TYPES } from "../../TYPES";
import { Channel } from "amqplib";
import { UrlResolvedDataMapper } from "./UrlResolvedDataMapper";
import { MessageQueueHandler } from "../../domain/MessageQueueHandler";

@injectable()
export class RabbitmqUrlResolvedQueue implements UrlResolvedQueue {
    private readonly QueueUrlResolved: string = "queue_url_resolved";

    constructor(
        @inject(TYPES.MessageQueue) private readonly messageQueue: Channel,
        @inject(TYPES.UrlResolvedDataMapper) private readonly dataMapper: UrlResolvedDataMapper,
    ) {
        this.messageQueue.assertQueue(
            this.QueueUrlResolved,
            { durable: true }
        );
    }

    async push(urlresolved: UrlResolved): Promise<void> {
        this.messageQueue.sendToQueue(
            this.QueueUrlResolved,
            this.dataMapper.toDalEntity(urlresolved),
        );
    }

    async subscribe(handler: MessageQueueHandler<UrlResolved>): Promise<void> {
        this.messageQueue.consume(
            this.QueueUrlResolved,
            (message) => {
                if ((message ?? null) === null) {
                    console.log('Invalid incoming message');
                    return;
                }
                handler.consume(this.dataMapper.toDomain(message?.content));
                this.messageQueue.ack(message);
            },
            {
                noAck: false,
            }
        );
    }
}
