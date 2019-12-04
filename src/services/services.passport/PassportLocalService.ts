import crypto from "crypto";
import {IUserRepository} from "../../repositories/interfaces/IUserRepository";
import {UsersRepository} from "../../repositories/UsersRepository";
import { IUserModel } from "../../schemas/interfaces/IUserModel";

export class PassportLocalService {
    public credentials: { usernameField: string; passwordField: string };
    private usersRepository: IUserRepository;
    constructor() {
        this.credentials = this.userCredentials;
        this.usersRepository = new UsersRepository();
    }
    public  handler = async(email: string, password: string, done: any): Promise<any>=> {
        try {
            const user: IUserModel | null = await this.usersRepository.findByEmail(email);
            // tslint:disable-next-line:no-unused-expression
            this.emailHandler;
            // tslint:disable-next-line:no-unused-expression
            this.passwordHandler;
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
    private emailHandler(user: IUserModel | null, done: any): any {
        if (!user) {
            return done(null, false, { error: { message: "Incorrect email or password!" }});
        }
    }
    private get userCredentials() {
        return {
            usernameField: "email",
            passwordField: "password",
        };
    }
    private isPasswordValid(user: IUserModel, password: string): boolean {
        if (user.salt) {
            const hash = crypto
                .pbkdf2Sync(password, user.salt, 1000, 512, "sha512")
                .toString("hex");
            return user.hash === hash;
        }
        return false;
    }
    private passwordHandler(user: IUserModel | null, password: string, done: any): any {
        if (user && !this.isPasswordValid(user, password)) {
            return done(null, false, { error: { message: "Incorrect email or password!" }});
        }
    }
}
