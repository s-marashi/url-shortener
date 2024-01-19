import { RequestHandler } from "../RequestHandler";
import { UrlResolved } from "./UrlResolved";

export interface UrlResolvedQueue {
    push(urlResolved: UrlResolved): Promise<void>;
    subscribe(handler: RequestHandler<UrlResolved>): Promise<void>;
}
