import { Response } from "express";
import { controller, httpGet, queryParam, requestParam, response } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../TYPES";
import { ResolveApplication } from "../application/ResolveApplication";

@controller("")
export class ResolveController {
    constructor(
        @inject(TYPES.ResolveApplication) private resolveApplication: ResolveApplication
    ) { }

    @httpGet(
        "/:short",
        // TYPES.ShortUrlValidator,
    )
    async resolve(
        @requestParam("short") short: string,
        @queryParam() queryParams: any,
        @response() res: Response
    ) {
        const resolvedUrl: string | null = await this.resolveApplication.resolveIt(short, queryParams);
        if (resolvedUrl === null) {
            return res.status(404).json({ error: "not found!" });
        }

        return res.redirect(resolvedUrl);
    }
}
