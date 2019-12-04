import { IUserEntity } from "../../entities/interfaces/IUserEntity";
import { IUserModel } from "../../schemas/interfaces/IUserModel";

export interface IUserRepository {
    findById(id: string): Promise<IUserModel | null>;
    findByEmail(email: string): Promise<IUserModel | null>;
    update(id: string, userEntity: IUserEntity): Promise<IUserModel | null>;
    store(userEntity: IUserEntity): Promise<IUserModel>;
}
