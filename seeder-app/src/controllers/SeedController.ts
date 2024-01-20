import { Request, Response } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { TYPES } from "../TYPES";
import { SeedingApplication } from "../application/SeedingApplication";
import { inject } from "inversify";
import { Seed } from "../domain/seed/Seed";

@controller("")
export class UrlController {
    constructor(
        @inject(TYPES.SeedingApplication) private seedingApplication: SeedingApplication
    ) { }

    @httpPost(
        "/seed",
    )
    async add(@request() req: Request, @response() res: Response) {
        const seed: Seed = await this.seedingApplication.generateSeed(req.body.identity ?? "");
        return res.json(seed);
    }
}
