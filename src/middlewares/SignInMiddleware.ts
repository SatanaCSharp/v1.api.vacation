import { NextFunction, Request, Response } from "express";
import { ISignUserMiddleware } from "./interfaces/ISignUserMiddleware";
import { SignInValidator } from "./validators/SignInValidator";

export class SignInMiddleware implements ISignUserMiddleware {
    public async validateRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        const signInValidator: SignInValidator = new SignInValidator(req);
        const isUsersData: boolean = [await signInValidator.email, signInValidator.password]
            .some((isUserData) => isUserData === true);
        if (isUsersData) {
            next();
        } else {
            res.sendStatus(400);
        }
    }
}
