import { IVacationEntity } from "../../entities/interfaces/IVacationEntity";
import { IVacationModel } from "../../schemas/interfaces/IVacationModel";

export interface IVacationsRepository {
    findAllByUserId(id: string): Promise<IVacationModel[]>;
    findById(id: string): Promise<IVacationModel | null>;
    store(userId: string, vacationEntity: IVacationEntity): Promise<IVacationModel[]>;
    update(id: string, userId: string, vacationEntity: IVacationEntity): Promise<IVacationModel[]>;
    delete(id: string, userId: string): Promise<IVacationModel[]>;
}
