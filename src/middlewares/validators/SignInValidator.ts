import { Request } from "express";
import {IUserRepository} from "../../repositories/interfaces/IUserRepository";
import {UsersRepository} from "../../repositories/UsersRepository";
import {IUserModel} from "../../schemas/interfaces/IUserModel";

export class SignInValidator {
    public email: Promise<boolean>;
    public password: boolean;
    private usersRepository: IUserRepository;
    constructor(req: Request) {
        this.usersRepository = new UsersRepository();
        this.email = this.isEmail(req);
        this.password = this.isPassword(req);
    }
    private  isEmail = async (req: Request): Promise<boolean> => {
        const user: IUserModel | null = await this.usersRepository.findByEmail(req.body.email);
        return user !== null;
    }

    private isPassword(req: Request): boolean {
        return req.body.password.length >= 6;
    }
}
