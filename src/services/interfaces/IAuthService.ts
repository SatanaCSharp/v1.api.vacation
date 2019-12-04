import { NextFunction, Request, Response } from "express";

export interface IAuthService {
    signUp(req: Request, res: Response): Promise<Response>;
    signIn(req: Request, res: Response, next: NextFunction): Promise<any>;
}
