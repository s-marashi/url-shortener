import { Response } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../TYPES";
import { UrlApplication } from "../application/SeedingApplication";
import { inject } from "inversify";

@controller("/urls")
export class UrlController {
    constructor(
        @inject(TYPES.UrlApplication) private urlApplication: UrlApplication
    ) { }

    @httpPost(
        "/seed",
    )
    async add(@request() req: Request, @response() res: Response) {
        return res.json("seed");
    }
}
