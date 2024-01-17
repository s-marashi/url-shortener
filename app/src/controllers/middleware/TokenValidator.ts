import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../customRequest/AuthenticatedRequest";
import { Jwt } from "../jwt/Jwt";

@injectable()
export class TokenValidator extends BaseMiddleware {

    public handler(req: AuthenticatedRequest, res: Response, next: NextFunction) {

        const jwt = Jwt.verify(req.header('Authorization'));
        if (jwt === null) {
            return res.status(403).send({ errors: "access denied." });
        }
        req.jwt = jwt;

        next();
    }
}
