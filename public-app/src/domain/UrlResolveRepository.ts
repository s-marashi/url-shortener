import { Url } from "./Url";

export interface UrlResolveRepository {
    get(short: string): Promise<Url | null>;
    set(short: string, long: string): Promise<void>;
}
