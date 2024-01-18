export interface ShortUrlProvider {
    getShortUrl(): Promise<string | null>;
}
