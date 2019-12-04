import { Document } from "mongoose";
import { IVacation } from "./IVacation";

export interface IVacationModel extends IVacation, Document {}
