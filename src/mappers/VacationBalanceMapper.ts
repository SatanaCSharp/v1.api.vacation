import { IVacationBalanceEntity } from "../entities/interfaces/IVacationBalanceEntity";
import {IVacationBalanceOptionsEntity} from "../entities/interfaces/IVacationBalanceOptionsEntity";
import { IMapToEntity } from "./interfaces/IMapToEntity";

export class VacationBalanceMapper implements IMapToEntity<IVacationBalanceOptionsEntity, IVacationBalanceEntity> {
    private readonly vacationBalanceEntity: IVacationBalanceEntity;
    constructor(vacationBalanceEntity: IVacationBalanceEntity) {
        this.vacationBalanceEntity = vacationBalanceEntity;
    }
    public mapToEntity(entityOptions: IVacationBalanceOptionsEntity): IVacationBalanceEntity {
        this.setAmount(entityOptions.amount);
        this.setUserId(entityOptions.userId);
        return this.vacationBalanceEntity;
    }
    private setAmount(amount: number): void {
        if (amount) {
            this.vacationBalanceEntity.amount = amount;
        }
    }
    private setUserId(userId: string): void {
        if (userId) {
            this.vacationBalanceEntity.userId = userId;
        }
    }
}
