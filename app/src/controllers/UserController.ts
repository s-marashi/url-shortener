import { Request, Response } from "express";
import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { UserApplication } from "../application/UserApplication";
import { TYPES } from "../TYPES";
import { body } from "express-validator";
import { Jwt } from "./jwt/Jwt";

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
        const user = await this.userApplication.authenticate(req.body.email, req.body.password);
        if (user === null) {
            return res.status(403).json({message: "access denied"});
        }

        const token = Jwt.generate(user.getEmail(), 7);
        res.set('Authorization', token);
        return res.json({message: "Login successful!"});
    }
}
