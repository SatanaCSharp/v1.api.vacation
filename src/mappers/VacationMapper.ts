import { Request } from "express";
import { IVacationEntity } from "../entities/interfaces/IVacationEntity";
import {IMapRequestToEntity} from "./interfaces/IMapRequestToEntity";

export class VacationMapper implements IMapRequestToEntity<Request, IVacationEntity> {
    private readonly vacationEntity: IVacationEntity;
    constructor(vacationEntity: IVacationEntity) {
        this.vacationEntity = vacationEntity;
    }
    public mapRequestToEntity(req: Request): IVacationEntity {
        this.setStartDate(req.body.startDate);
        this.setEndDate(req.body.endDate);
        this.setDescription(req.body.description);
        this.setUserId(req.params.userId);
        return this.vacationEntity;
    }
    private setStartDate(date: string): void {
        if (date) {
            this.vacationEntity.startDate = new Date(date);
        }
    }
    private setEndDate(date: string): void {
        if (date) {
            this.vacationEntity.endDate = new Date(date);
        }
    }
    private setDescription(description: string): void {
        if (description) {
            this.vacationEntity.description = description;
        }
    }
    private setUserId(id: string): void {
        if (id) {
            this.vacationEntity.userId = id;
        }
    }
}
