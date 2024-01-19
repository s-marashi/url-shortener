import { inject, injectable } from "inversify";
import { TYPES } from "../TYPES";
import { ResolveRepository } from "../domain/resolve/ResolveRepository";
import { Resolve } from "../domain/resolve/Resolve";
import { UrlResolvedQueue } from "../domain/urlResolved/UrlResolvedQueue";
import { UrlResolved } from "../domain/urlResolved/UrlResolved";

@injectable()
export class ResolveApplication {
    constructor(
        @inject(TYPES.ResolveRepository)
        private readonly resolveRepository: ResolveRepository,
        @inject(TYPES.UrlResolvedQueue)
        private readonly urlResolvedQueue: UrlResolvedQueue,
    ) { }

    async resolveIt(short: string, queryParams: any): Promise<string | null> {
        const resolve = await this.resolveRepository.get(short);
        if (resolve === null) {
            return null;
        }

        await this.urlResolvedQueue.push(UrlResolved.createFromResolve(resolve));

        return this.makeResolvedUrl(resolve, queryParams);
    }

    private makeResolvedUrl(resolve: Resolve, params: any): string {
        const baseUrl: URL = new URL(resolve.long);
        const requestParams = new URLSearchParams(params);

        for (const [key, value] of requestParams.entries()) {
            baseUrl.searchParams.append(key, value);
        }
        console.log(baseUrl.searchParams.toString());

        return baseUrl.href;
    }
}
