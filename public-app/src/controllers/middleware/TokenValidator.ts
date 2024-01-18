import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";

@injectable()
export class TokenValidator extends BaseMiddleware {

    public handler(req: Request, res: Response, next: NextFunction) {
        next();
    }
}
