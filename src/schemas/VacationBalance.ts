import { Model, model, Schema } from "mongoose";
import { IVacationBalanceModel } from "./interfaces/IVacationBalanceModel";

const VacationBalanceSchema: Schema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        default: Date.now,
        required: true,
        type: Date,
    },
});
export const VacationBalance: Model<IVacationBalanceModel> = model<IVacationBalanceModel>(
    "VacationBalance", VacationBalanceSchema);
