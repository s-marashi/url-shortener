import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../customRequest/AuthenticatedRequest";
import { Jwt } from "../jwt/Jwt";

@injectable()
export class TokenValidator extends BaseMiddleware {

    public handler(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const header: string | null = req.header('Authorization') as string | null;
        if (header === undefined) {
            return res.status(403).send({ errors: "access denied." });
        }

        const jwt = Jwt.verify(header);
        if (jwt === null) {
            return res.status(403).send({ errors: "access denied." });
        }
        req.jwt = jwt;

        next();
    }
}
