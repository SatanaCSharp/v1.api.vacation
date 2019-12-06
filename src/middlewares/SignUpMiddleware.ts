
import { NextFunction, Request, Response } from "express";
import { ISignUserMiddleware } from "./interfaces/ISignUserMiddleware";
import { SignUpValidator } from "./validators/SignUpValidator";
export class SignUpMiddleware implements ISignUserMiddleware {
    public async validateRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        const signUpValidator: SignUpValidator = new SignUpValidator(req);
        const isUsersData: boolean = [
            await signUpValidator.email,
            signUpValidator.firstName,
            signUpValidator.lastName,
            signUpValidator.password,
            signUpValidator.passwordConfirmation,
        ].every((isUserData) => isUserData);
        if (isUsersData) {
            next();
        } else {
            res.sendStatus(400);
        }
    }
}
