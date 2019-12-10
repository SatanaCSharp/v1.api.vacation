import { IVacationBalanceEntity } from "../../entities/interfaces/IVacationBalanceEntity";
import { IVacationBalanceModel } from "../../schemas/interfaces/IVacationBalanceModel";

export interface IVacationBalancesRepository {
    findAll(): Promise<IVacationBalanceModel[]>;
    findByUserId(userId: string): Promise<IVacationBalanceModel | null>;
    store(vacationBalanceEntity: IVacationBalanceEntity): Promise<IVacationBalanceModel>;
    update(userId: string, vacationBalanceEntity: IVacationBalanceEntity): Promise<IVacationBalanceModel | null>;
}
