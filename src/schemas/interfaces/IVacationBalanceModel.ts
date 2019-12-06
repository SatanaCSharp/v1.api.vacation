import { Document } from "mongoose";
import { IVacationBalance } from "./IVacationBalance";

export interface IVacationBalanceModel extends IVacationBalance, Document {}
