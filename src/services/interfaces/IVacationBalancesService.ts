import { Request } from "express";
import { IVacationBalanceModel } from "../../schemas/interfaces/IVacationBalanceModel";
import {IVacationModel} from "../../schemas/interfaces/IVacationModel";

export interface IVacationBalancesService {
    storeInitialBalance(userId: string): Promise<IVacationBalanceModel>;
    show(req: Request): Promise<IVacationBalanceModel | null>;
    updateBalanceStoredVacation(req: Request): Promise<IVacationBalanceModel | null>;
    updateBalanceUpdatedHiredDate(req: Request): Promise<IVacationBalanceModel | null>;
    updateBalanceUpdatedVacation(req: Request, currentVacation: IVacationModel): Promise<IVacationBalanceModel | null>;
    updateBalanceDeletedVacation(req: Request, currentVacation: IVacationModel): Promise<IVacationBalanceModel | null>;
}
