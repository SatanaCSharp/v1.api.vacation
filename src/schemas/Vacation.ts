import { Model, model, Schema } from "mongoose";
import { IVacationModel } from "./interfaces/IVacationModel";

const VacationSchema: Schema = new Schema({
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
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
export const Vacation: Model<IVacationModel> = model<IVacationModel>("Vacation", VacationSchema);
