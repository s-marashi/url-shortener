import { MessageQueueHandler } from "../MessageQueueHandler";
import { UrlResolved } from "./UrlResolved";

export interface UrlResolvedQueue {
    push(urlResolved: UrlResolved): Promise<void>;
    consume(handler: MessageQueueHandler<UrlResolved>): Promise<void>;
}
