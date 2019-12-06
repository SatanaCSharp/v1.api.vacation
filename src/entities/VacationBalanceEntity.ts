import { IVacationBalanceEntity } from "./interfaces/IVacationBalanceEntity";

export class VacationBalanceEntity implements IVacationBalanceEntity {
    public userId?: string;
    public amount?: number;
}
