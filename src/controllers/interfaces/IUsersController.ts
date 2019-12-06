import { Request, Response } from "express";

export interface IUsersController {
    show(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
}
