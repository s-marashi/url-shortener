import { Response } from "express";
import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../TYPES";
import { AuthenticatedRequest } from "./customRequest/AuthenticatedRequest";
import { body } from "express-validator";
import { Email } from "../domain/Email";
import { Url } from "../domain/url/Url";
import { UrlApplication } from "../application/UrlApplication";
import { inject } from "inversify";

@controller("/urls")
export class UrlController {
    constructor(
        @inject(TYPES.UrlApplication) private urlApplication: UrlApplication
    ) { }

    @httpPost(
        "/",
        TYPES.TokenValidator,
        body("url", "Url is invalid").notEmpty().isURL(),
        TYPES.RequestValidator
    )
    async add(@request() req: AuthenticatedRequest, @response() res: Response) {
        const email: Email = req.jwt.getEmail();
        const url: Url | null = await this.urlApplication.add(req.body.url, email);

        if (url === null) {
            return res.status(400).json({ error: "failed to create" });
        }

        return res.json({ short: url.getShort() });
    }

    // @httpDelete(
    //     "/",
    //     body("url", "Url is invalid.").notEmpty().isURL(),
    //     TYPES.RequestValidator
    // )
    // async drop(@request() req: Request, @response() res: Response) {
    // }

    @httpGet(
        "/",
        TYPES.TokenValidator
    )
    async list(@request() req: AuthenticatedRequest, @response() res: Response) {
        console.log(req.jwt.getEmail().toString());
        return res.json("Authenticated");
    }
}
