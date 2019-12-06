import { IVacationEntity } from "./interfaces/IVacationEntity";

export class VacationEntity implements IVacationEntity {
    public startDate?: Date;
    public endDate?: Date;
    public  description?: string;
    public  userId?: string;

}
