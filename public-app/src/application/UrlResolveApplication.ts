import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { URL } from "url";
import { UrlResolveRepository } from "../domain/resolve/UrlResolveRepository";
import { Url } from "../domain/resolve/Url";
import { StatisticsApplication } from "./StatisticsApplication";

@injectable()
export class UrlResolveApplication {
    constructor(
        @inject(TYPES.UrlResolveCache)
        private readonly urlResolveCache: UrlResolveRepository,
        @inject(TYPES.UrlResolveDb)
        private readonly urlResolveDb: UrlResolveRepository,
        @inject(TYPES.StatisticsApplication)
        private readonly statisticsApplication: StatisticsApplication,
    ) { }

    async resolve(short: string, queryParams: string[]): Promise<string | null> {        
        let url: Url = await this.urlResolveCache.get(short);
        if (url !== null) {
            this.statisticsApplication.send(url);
            return this.makeResolvedUrl(url, queryParams);
        };

        url = await this.urlResolveDb.get(short);
        if (url === null) {
            return null;
        }

        this.urlResolveCache.set(url);
        this.statisticsApplication.send(url);

        return this.makeResolvedUrl(url, queryParams);
    }

    private makeResolvedUrl(url: Url, params: string[]): string {

        const baseUrl = new URL(url.long);

        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                const value = params[key];
                baseUrl.searchParams.set(key, value);
            }
        }

        return baseUrl.href;
    }
}
