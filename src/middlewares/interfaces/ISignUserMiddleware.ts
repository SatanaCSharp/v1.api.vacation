import { NextFunction, Request, Response } from "express";

export interface ISignUserMiddleware {
    validateRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
}
