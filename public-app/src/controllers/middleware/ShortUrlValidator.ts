import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { Resolve } from "../../domain/resolve/Resolve";

@injectable()
export class ShortUrlValidator extends BaseMiddleware {
    public handler(req: Request, res: Response, next: NextFunction) {
        if (!Resolve.validateShort(req.params.short)) {
            res.status(400).json({ error: "not found" });
        }
        next();
    }
}
