import { UrlResolved } from "./UrlResolved";

export interface UrlResolvedQueue {
    push(urlResolved: UrlResolved): Promise<void>;
    consume(): Promise<void>;
}
