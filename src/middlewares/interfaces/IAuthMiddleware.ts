import { RequestHandler } from "express-jwt";

export interface IAuthMiddleware {
    verify: RequestHandler;
    optional: RequestHandler;
}
