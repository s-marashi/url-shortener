import { Request, Response } from "express";
import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { UserApplication } from "../application/UserApplication";
import { TYPES } from "../TYPES";
import { body } from "express-validator";

@controller("/auth")
export class UserController {
    constructor(
        @inject(TYPES.UserApplication) private userApplication: UserApplication
    ) { }

    @httpPost(
        "/sign-up",
        body("email", "Email is invalid.").notEmpty().isEmail(),
        body("password", "Password is missing.").notEmpty(),
        TYPES.RequestValidator
    )
    async signup(@request() req: Request, @response() res: Response) {
        await this.userApplication.signUp(req.body.email, req.body.password);
        return res.json("created");
    }

    @httpPost(
        "/login",
        body("email", "Email is invalid.").notEmpty().isEmail(),
        body("password", "Password is missing.").notEmpty(),
        TYPES.RequestValidator
    )
    async login(@request() req: Request, @response() res: Response) {
        const token = await this.userApplication.authenticate(req.body.email, req.body.password);
        if (token === null) {
            return res.status(403).json({message: "access denied"});
        }
        
        return res.json({message: "Successfully login done."});
    }
}
