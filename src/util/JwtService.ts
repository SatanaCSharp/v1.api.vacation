import jwt from "jsonwebtoken";
import {config} from "../config";
import {IUserModel} from "../schemas/interfaces/IUserModel";


export class JwtService {

    public authJSON(user: IUserModel): { _id: string; email: string; token: string } {
        return {
            _id: user._id,
            email: user.email,
            token: this.setJWT(user),
        };
    }
    private setJWT(user: IUserModel): string {
        const dateNow = new Date();
        const expirationDate = new Date(dateNow);
        expirationDate.setDate(dateNow.getDate() + 60);
        return jwt.sign(
            {
                id: user._id,
                email: user.email,
                expirationDate: (Number(expirationDate.getTime()) / 1000).toFixed(0),
            },
            config.secret,
        );
    }
}
export const jwtService: JwtService = new JwtService();
