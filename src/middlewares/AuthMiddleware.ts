import { Request } from "express";
import jwt, { RequestHandler } from "express-jwt";
import { config } from "../config";
import { IAuthMiddleware } from "./interfaces/IAuthMiddleware";

export class AuthMiddleware implements IAuthMiddleware {
    private getHeadersToken(req: Request) {
        const {
            headers: { authorization },
        } = req;
        if (authorization && authorization.split(" ")[0] === "Bearer") {
            return authorization.split(" ")[1];
        }
        return null;
    }
    public get verify(): RequestHandler  {
        return jwt({
            secret: config.secret,
            getToken: this.getHeadersToken,
        });
    }
    public get optional(): RequestHandler {
        return jwt({
            secret: config.secret,
            getToken: this.getHeadersToken,
            credentialsRequired: false,
        });
    }
}
