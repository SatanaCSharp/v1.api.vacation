import { IUserEntity } from "../entities/interfaces/IUserEntity";
import { IUserModel } from "../schemas/interfaces/IUserModel";
import { User } from "../schemas/User";
import { IUserRepository } from "./interfaces/IUserRepository";

export class UsersRepository implements IUserRepository {
    public async findById(id: string): Promise<IUserModel | null> {
        return await User.findById(id, "_id firstName lastName email hiredDate").exec();
    }
    public async findByEmail(email: string): Promise<IUserModel | null> {
        return await User.findOne({ email }, "_id firstName lastName email hiredDate").exec();
    }
    public async store(userEntity: IUserEntity): Promise<IUserModel> {
        const user: IUserModel = new User(userEntity);
        return await user.save();
    }
    public async update(id: string, userEntity: IUserEntity): Promise<IUserModel | null> {
        await User.findOneAndUpdate({ _id: id }, userEntity).exec();
        return await this.findById(id);
    }
}
