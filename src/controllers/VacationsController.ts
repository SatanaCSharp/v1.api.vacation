import { Request, Response } from "express";
import {IVacationsService} from "../services/interfaces/IVacationsService";
import {VacationsService} from "../services/services.vacations/VacationsService";
import { IVacationsController } from "./interfaces/IVacationsController";

export class VacationsController implements IVacationsController {
    private vacationsService: IVacationsService;
    constructor() {
        this.vacationsService = new VacationsService();
    }
    public  index = async (req: Request, res: Response): Promise<void> => {
        await this.vacationsService.index(req, res);
    }
    public  show = async (req: Request, res: Response): Promise<void> => {
        await this.vacationsService.show(req, res);
    }
    public  store = async (req: Request, res: Response): Promise<void> => {
        await this.vacationsService.store(req, res);
    }
    public  update = async (req: Request, res: Response): Promise<void> => {
        await this.vacationsService.update(req, res);
    }
    public  delete = async (req: Request, res: Response): Promise<void> => {
        await this.vacationsService.delete(req, res);
    }
}
