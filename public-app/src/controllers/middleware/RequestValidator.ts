import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

@injectable()
export class RequestValidator extends BaseMiddleware {

    public handler(req: Request, res: Response, next: NextFunction) {
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(422).send({ errors: validationErrors.array() });
        }

        next();
    }
}
