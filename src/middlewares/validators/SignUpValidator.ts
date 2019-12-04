import { Request } from "express";
import {IUserRepository} from "../../repositories/interfaces/IUserRepository";
import {UsersRepository} from "../../repositories/UsersRepository";
import {IUserModel} from "../../schemas/interfaces/IUserModel";


export class SignUpValidator {
    public firstName: boolean;
    public lastName: boolean;
    public email: Promise<boolean>;
    public password: boolean;
    public passwordConfirmation: boolean;
    private usersRepository: IUserRepository;
    constructor(req: Request) {
        this.usersRepository = new UsersRepository();
        this.firstName = this.isFirstName(req);
        this.lastName = this.isLastName(req);
        this.email = this.isEmail(req);
        this.password = this.isPassword(req);
        this.passwordConfirmation = this.isPasswordConfirmation(req);
    }
    private isFirstName(req: Request): boolean {
        return req.body.firstName.length <= 256 && req.body.firstName.length >= 2;
    }
    private isLastName(req: Request): boolean {
        return req.body.lastName.length <= 256 && req.body.lastName.length >= 2;
    }
    private  isEmail = async (req: Request) => {
        const user: IUserModel | null = await this.usersRepository.findByEmail(req.body.email);
        return user === null;
    }
    private isPassword(req: Request): boolean {
        return req.body.password.length >= 6;
    }
    private isPasswordConfirmation(req: Request): boolean {
        return req.body.passwordConfirmation === req.body.password;
    }
}
