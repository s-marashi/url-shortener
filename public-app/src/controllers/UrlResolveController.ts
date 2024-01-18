import { Request, Response } from "express";
import { controller, httpGet, httpPost, queryParam, request, requestParam, response } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../TYPES";
import { UrlResolveApplication } from "../application/UrlResolveApplication";

@controller("")
export class UrlResolveController {
    constructor(
        @inject(TYPES.UrlResolveApplication) private urlResolveApplication: UrlResolveApplication
    ) { }

    @httpGet(
        "/:short",
        // TYPES.ShortUrlValidator,
    )
    async resolve(
        @requestParam("short") short: string,
        @queryParam() queryParams: string[],
        @response() res: Response
    ) {
        const resolvedUrl: string | null = await this.urlResolveApplication.resolve(short, queryParams);
        if (resolvedUrl === null) {
            return res.status(404).json({error: "not found!"});
        }

        return res.redirect(resolvedUrl);
    }
}
