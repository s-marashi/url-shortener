import { Url } from "./Url";

export interface UrlResolveRepository {
    get(short: string): Promise<Url | null>;
    set(url: Url): Promise<void>;
}
