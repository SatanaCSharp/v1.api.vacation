import { Model, model, Schema } from "mongoose";
import { IUserModel } from "./interfaces/IUserModel";
const UserSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    hash: String,
    salt: String,
    hiredDate: {
        default: Date.now,
        required: true,
        type: Date,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    createdAt: {
        default: Date.now,
        required: true,
        type: Date,
    },
});
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);
