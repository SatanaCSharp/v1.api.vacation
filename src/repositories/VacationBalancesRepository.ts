import { IVacationBalanceEntity } from "../entities/interfaces/IVacationBalanceEntity";
import { IVacationBalanceModel } from "../schemas/interfaces/IVacationBalanceModel";
import { VacationBalance } from "../schemas/VacationBalance";
import { IVacationBalancesRepository } from "./interfaces/IVacationBalancesRepository";

export class VacationBalancesRepository implements IVacationBalancesRepository {
    public  findAll = async (): Promise<IVacationBalanceModel[]> => {
        return VacationBalance.find({}, "_id userId amount");
    }
    public  findByUserId = async (userId: string): Promise<IVacationBalanceModel | null> => {
        return VacationBalance.findOne({userId}, "_id amount");
    }
    public  store = async (vacationBalanceEntity: IVacationBalanceEntity): Promise<IVacationBalanceModel> => {
        const vacationBalance: IVacationBalanceModel = new VacationBalance(vacationBalanceEntity);
        return await vacationBalance.save();
    }

    public  update = async (
        userId: string,
        vacationBalanceEntity: IVacationBalanceEntity,
    ): Promise<IVacationBalanceModel | null> => {
        return VacationBalance.findOneAndUpdate({userId}, vacationBalanceEntity);
    }
}
