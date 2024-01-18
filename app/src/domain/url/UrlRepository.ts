import { Url } from "./Url";

export interface UrlRepository {
    doesExists(long: string, userId: string): Promise<boolean>;
    save(url: Url): Promise<Url | null>;
}
