import { IVacationEntity } from "../entities/interfaces/IVacationEntity";
import { IVacationModel } from "../schemas/interfaces/IVacationModel";
import { Vacation } from "../schemas/Vacation";
import { IVacationsRepository } from "./interfaces/IVacationsRepository";

export class VacationsRepository implements IVacationsRepository {
    public findAllByUserId = async (userId: string): Promise<IVacationModel[]> => {
        return await Vacation.find({ userId }, "_id startDate endDate userId description").exec();
    }
    public findById = async (id: string): Promise<IVacationModel | null> => {
        return await Vacation.findById(id, "_id startDate endDate userId description").exec();
    }
    public store = async (userId: string, vacationEntity: IVacationEntity): Promise<IVacationModel[]> => {
        const vacation: IVacationModel = new Vacation(vacationEntity);
        await vacation.save();
        return await this.findAllByUserId(userId);
    }
    public update = async (id: string, userId: string,  vacationEntity: IVacationEntity): Promise<IVacationModel[]> => {
        await Vacation.findByIdAndUpdate({_id: id}, vacationEntity).exec();
        return await this.findAllByUserId(userId);
    }
    public delete = async (id: string, userId: string): Promise<IVacationModel[]> => {
        await Vacation.deleteOne({_id: id}).exec();
        return this.findAllByUserId(userId);
    }
}
