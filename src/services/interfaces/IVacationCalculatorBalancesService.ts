import { Request } from "express";
import { IVacationBalanceEntity } from "../../entities/interfaces/IVacationBalanceEntity";
import {IVacationBalanceModel} from "../../schemas/interfaces/IVacationBalanceModel";
import {IVacationModel} from "../../schemas/interfaces/IVacationModel";


export interface IVacationCalculatorBalancesService {
    getInitialBalance(useId: string): IVacationBalanceEntity;
    getBalanceStoredVacation(balance: IVacationBalanceModel, req: Request): IVacationBalanceEntity;
    getBalanceUpdatedHiredDate(
        userId: string,
        balance: IVacationBalanceModel,
        currentHiredDate: Date,
        updatedHiredDate: Date,
    ): IVacationBalanceEntity;
    getBalanceDeletedVacation(
        req: Request,
        balance: IVacationBalanceModel,
        vacation: IVacationModel,
        ): IVacationBalanceEntity;
    getBalanceUpdatedVacation(
        balance: IVacationBalanceModel,
        vacation: IVacationModel,
        req: Request,
    ): IVacationBalanceEntity;
}
