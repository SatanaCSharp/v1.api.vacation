import { Request } from "express";
import moment, { Moment } from "moment";
import { IVacationBalanceEntity } from "../../entities/interfaces/IVacationBalanceEntity";
import { IVacationBalanceOptionsEntity } from "../../entities/interfaces/IVacationBalanceOptionsEntity";
import {VacationBalanceEntity} from "../../entities/VacationBalanceEntity";
import {VacationBalanceMapper} from "../../mappers/VacationBalanceMapper";
import { IVacationBalanceModel } from "../../schemas/interfaces/IVacationBalanceModel";
import {IVacationModel} from "../../schemas/interfaces/IVacationModel";
import { IVacationCalculatorBalancesService } from "../interfaces/IVacationCalculatorBalancesService";
const FIRS_DAY_OF_VACATION = 1;

export class VacationCalculatorBalancesService implements IVacationCalculatorBalancesService {
    public getInitialBalance(userId: string): IVacationBalanceEntity {
        const balanceOptionsEntity = this.getBalanceOptions(userId, 21);
        return this.getBalanceEntity(balanceOptionsEntity);
    }
    public getBalanceStoredVacation(currentBalance: IVacationBalanceModel, req: Request): IVacationBalanceEntity {
        const calculatedBalance: number = this.calculateBalanceStoredVacation(currentBalance, req);
        const balanceOptionsEntity = this.getBalanceOptions(req.params.userId, calculatedBalance);
        return this.getBalanceEntity(balanceOptionsEntity);
    }
    public getBalanceUpdatedHiredDate(
        userId: string,
        balance: IVacationBalanceModel,
        currentHiredDate: Date,
        updatedHiredDate: Date,
    ): IVacationBalanceEntity {
        const calculatedBalance: number = this
        .calculateBalanceUpdatedHiredDate(balance, currentHiredDate, updatedHiredDate);
        const balanceOptionsEntity = this.getBalanceOptions(userId, calculatedBalance);
        return this.getBalanceEntity(balanceOptionsEntity);
    }

    public getBalanceUpdatedVacation(
        balance: IVacationBalanceModel,
        vacation: IVacationModel,
        req: Request,
    ): IVacationBalanceEntity {
        const calculatedBalance = this.calculateBalanceUpdatedVacation(balance, vacation, req);
        const balanceOptionsEntity = this.getBalanceOptions(req.params.userId, calculatedBalance);
        return this.getBalanceEntity(balanceOptionsEntity);
    }
    public getBalanceDeletedVacation(
            req: Request,
            balance: IVacationBalanceModel,
            vacation: IVacationModel,
          ): IVacationBalanceEntity {
        const calculatedBalance: number = this.calculateBalanceDeletedVacation(balance, vacation);
        const balanceOptionsEntity = this.getBalanceOptions(req.params.userId, calculatedBalance);
        return this.getBalanceEntity(balanceOptionsEntity);
    }
    public getBalanceUpdatedMonthly(userId: string, balance: IVacationBalanceModel): IVacationBalanceEntity {
        const calculatedBalance: number = this.calculateMonthBalance(balance);
        const balanceOptionsEntity = this.getBalanceOptions(userId, calculatedBalance);
        return this.getBalanceEntity(balanceOptionsEntity);
    }
    private getBalanceEntity(balanceOptionsEntity: IVacationBalanceOptionsEntity ): IVacationBalanceEntity {
        return new VacationBalanceMapper(new VacationBalanceEntity()).mapToEntity(balanceOptionsEntity);
    }
    private getBalanceOptions(userId: string, amount: number): IVacationBalanceOptionsEntity {
        return { userId, amount };
    }
    private calculateBalanceUpdatedVacation(
        balance: IVacationBalanceModel,
        vacation: IVacationModel,
        req: Request): number {
            const startDateNewVacation: Date = new Date(req.body.startDate);
            const endDateNewVacation: Date = new Date(req.body.endDate);
            const startDateOldVacation: Date = new Date(vacation.startDate);
            const endDateOldVacation: Date = new Date(vacation.endDate);
            const daysDifferenceNewVacation: number = this.getDaysDifference(startDateNewVacation, endDateNewVacation);
            const daysDifferenceOldVacation: number = this.getDaysDifference(startDateOldVacation, endDateOldVacation);
            const daysDiff: number = daysDifferenceOldVacation - daysDifferenceNewVacation;
            return  balance.amount + daysDiff;
    }
    private calculateBalanceUpdatedHiredDate(
        balance: IVacationBalanceModel,
        currentHiredDate: Date,
        updatedHiredDate: Date,
        ): number {
        const newHiredDate: Date = new Date(updatedHiredDate);
        const oldHiredDate: Date = new Date(currentHiredDate);
        const monthDifference: number = this.getMonthsDifference(newHiredDate, oldHiredDate);
        const yearsDifference: number = this.getYearsDifference(newHiredDate, oldHiredDate);
        const previousYearBalance: number = Math.round(balance.amount + monthDifference * 1.75);
        const currentYearBalance: number = balance.amount;
        return yearsDifference >= 1 ? previousYearBalance : currentYearBalance;
    }
    private calculateBalanceStoredVacation(currentBalance: IVacationBalanceModel, req: Request): number {
        const startDate: Date = new Date(req.body.startDate);
        const endDate: Date = new Date(req.body.endDate);
        const daysDifference: number = this.getDaysDifference(startDate, endDate);
        return Math.round(currentBalance.amount - daysDifference);
    }
    private calculateBalanceDeletedVacation( balance: IVacationBalanceModel, vacation: IVacationModel): number {
        const startDate: Date = new Date(vacation.startDate);
        const endDate: Date = new Date(vacation.endDate);
        const daysDifference: number = this.getDaysDifference(startDate, endDate);
        return Math.round(balance.amount + daysDifference);
    }
    private calculateMonthBalance(balance: IVacationBalanceModel): number {
        return Math.round(balance.amount + 1.75);
    }

    private getDaysDifference(startDate: Date, endDate: Date): number {
        const momentStartDate: Moment = moment(startDate);
        const momentEndDate: Moment = moment(endDate);
        let daysDifference: number = Math
        .round(momentStartDate.diff(momentEndDate, "days") - momentStartDate .diff(momentEndDate, "days") / 7 * 2);
        if (momentEndDate.day() === 6) {
            daysDifference--;
        }
        if (momentStartDate.day() === 7) {
            daysDifference--;
        }
        return (daysDifference * -1) + FIRS_DAY_OF_VACATION;
    }
    private getMonthsDifference(startDate: Date, endDate: Date): number {
        const momentStartDate: Moment = moment(startDate);
        const momentEndDate: Moment = moment(endDate);
        return moment.duration(momentEndDate.diff(momentStartDate)).asMonths();
    }
    private getYearsDifference(startDate: Date, endDate: Date): number {
        const momentStartDate: Moment = moment(startDate);
        const momentEndDate: Moment = moment(endDate);
        return momentEndDate.diff(momentStartDate, "years");
    }
}
