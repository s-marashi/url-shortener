import { Response } from "express";
import { controller, httpGet, request, response } from "inversify-express-utils";

@controller("/health")
export class HealthCheckController {
    @httpGet("")
    async statistics(@request() req: Request, @response() res: Response) {
        return res.json({status: "SeederApp: Okey :D"});
    }
}
