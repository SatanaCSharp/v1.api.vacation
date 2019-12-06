import { Request, Response } from "express";

export interface IUsersService {
    show(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
}
