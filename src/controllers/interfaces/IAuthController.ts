import { NextFunction, Request, Response } from "express";

export interface IAuthController {
    signUp(req: Request, res: Response): Promise<void>;
    signIn(req: Request, res: Response, next: NextFunction): Promise<void>;
}
