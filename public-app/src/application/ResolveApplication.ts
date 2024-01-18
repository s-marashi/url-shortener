import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { ResolveRepository } from "../domain/resolve/ResolveRepository";
import { Resolve } from "../domain/resolve/Resolve";
import { StatisticsApplication } from "./StatisticsApplication";

@injectable()
export class ResolveApplication {
    constructor(
        @inject(TYPES.ResolveCache)
        private readonly resolveCache: ResolveRepository,
        @inject(TYPES.ResolveDb)
        private readonly resolveDb: ResolveRepository,
        @inject(TYPES.StatisticsApplication)
        private readonly statisticsApplication: StatisticsApplication,
    ) { }

    async resolveIt(short: string, queryParams: string[]): Promise<string | null> {        
        let resolve: Resolve = await this.resolveCache.get(short);
        if (resolve !== null) {
            this.statisticsApplication.send(resolve);
            return this.makeResolvedUrl(resolve, queryParams);
        };

        resolve = await this.resolveDb.get(short);
        if (resolve === null) {
            return null;
        }

        this.resolveCache.set(resolve);
        this.statisticsApplication.send(resolve);

        return this.makeResolvedUrl(resolve, queryParams);
    }

    private makeResolvedUrl(resolve: Resolve, params: string[]): string {

        const baseUrl = new URL(resolve.long);

        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                const value = params[key];
                baseUrl.searchParams.set(key, value);
            }
        }

        return baseUrl.href;
    }
}
