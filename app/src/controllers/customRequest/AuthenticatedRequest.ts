import { Jwt } from "../jwt/Jwt";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    jwt: Jwt
}
