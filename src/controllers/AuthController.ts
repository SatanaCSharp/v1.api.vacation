import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../services/interfaces/IAuthService";
import { AuthLocalService } from "../services/services.auth/AuthLocalService";
import { IAuthController } from "./interfaces/IAuthController";

export class AuthController implements IAuthController {
    private authLocalService: IAuthService;
    constructor() {
        this.authLocalService = new AuthLocalService();
    }
    public  signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await this.authLocalService.signIn(req, res, next);
    }

    public  signUp = async (req: Request, res: Response): Promise<void> => {
        await this.authLocalService.signUp(req, res);
    }
}
