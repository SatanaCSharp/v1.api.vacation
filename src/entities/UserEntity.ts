import {IUserEntity} from "./interfaces/IUserEntity";

export class UserEntity implements IUserEntity {
    public firstName?: string;
    public lastName?: string;
    public salt?: string;
    public hash?: string;
    public email?: string;
    public hiredDate?: Date;
}
