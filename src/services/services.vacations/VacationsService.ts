import { Request, Response } from "express";
import { IVacationEntity } from "../../entities/interfaces/IVacationEntity";
import {VacationEntity} from "../../entities/VacationEntity";
import {IMapRequestToEntity} from "../../mappers/interfaces/IMapRequestToEntity";
import { VacationMapper } from "../../mappers/VacationMapper";
import {IVacationsRepository} from "../../repositories/interfaces/IVacationsRepository";
import {VacationsRepository} from "../../repositories/VacationsRepository";
import {IVacationModel} from "../../schemas/interfaces/IVacationModel";
import {IVacationBalancesService} from "../interfaces/IVacationBalancesService";
import { IVacationsService } from "../interfaces/IVacationsService";
import { VacationBalanceService } from "./VacationBalancesService";

export class VacationsService implements IVacationsService {
    private vacationsRepository: IVacationsRepository;
    private vacationMapper: IMapRequestToEntity<Request, IVacationEntity>;
    private vacationBalanceServices: IVacationBalancesService;
    constructor() {
        this.vacationsRepository = new VacationsRepository();
        this.vacationBalanceServices = new VacationBalanceService();
        this.vacationMapper = new VacationMapper(new VacationEntity());
    }
    public  index = async (req: Request, res: Response): Promise<void> => {
        try {
            res.send(await this.vacationsRepository.findAllByUserId(req.params.userId));
        } catch (err) {
            res.sendStatus(500);
        }
    }
    public  show = async (req: Request, res: Response): Promise<void> => {
        try {
            const vacation =  await this.vacationsRepository.findById(req.params.id);
            res.send(vacation);
        } catch (err) {
            res.sendStatus(500);
        }
    }
    public store = async (req: Request, res: Response): Promise<void> => {
        try {
            const vacationEntity: IVacationEntity = this.vacationMapper.mapRequestToEntity(req);
            await this.vacationBalanceServices.updateBalanceStoredVacation(req);
            res.send(await this.vacationsRepository.store(req.params.userId, vacationEntity));
        } catch (err) {
            res.sendStatus(500);
        }
    }
    public  update = async (req: Request, res: Response): Promise<void> =>  {
        try {
            const vacationEntity: IVacationEntity = this.vacationMapper.mapRequestToEntity(req);
            const currentVacation: IVacationModel | null = await this.vacationsRepository.findById(req.params.id);
            if (currentVacation) {
                await this.vacationBalanceServices.updateBalanceUpdatedVacation(req, currentVacation);
            }
            res.send(await this.vacationsRepository.update(req.params.id, req.params.userId, vacationEntity));
        } catch (err) {
            res.sendStatus(500);
        }
    }
    public  delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const currentVacation: IVacationModel | null = await this.vacationsRepository.findById(req.params.id);
            if (currentVacation) {
                await this.vacationBalanceServices.updateBalanceDeletedVacation(req, currentVacation);
            }
            res.send(await this.vacationsRepository.delete(req.params.id, req.params.userId));
        } catch (err) {
            res.sendStatus(500);
        }
    }
}
