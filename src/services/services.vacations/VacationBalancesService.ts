import { Request } from "express";
import {IVacationBalanceEntity} from "../../entities/interfaces/IVacationBalanceEntity";
import {IUserRepository} from "../../repositories/interfaces/IUserRepository";
import {IVacationBalancesRepository} from "../../repositories/interfaces/IVacationBalancesRepository";
import {UsersRepository} from "../../repositories/UsersRepository";
import {VacationBalancesRepository} from "../../repositories/VacationBalancesRepository";
import {IUserModel} from "../../schemas/interfaces/IUserModel";
import { IVacationBalanceModel } from "../../schemas/interfaces/IVacationBalanceModel";
import {IVacationModel} from "../../schemas/interfaces/IVacationModel";
import { IVacationBalancesService } from "../interfaces/IVacationBalancesService";
import {IVacationCalculatorBalancesService} from "../interfaces/IVacationCalculatorBalancesService";
import { VacationCalculatorBalancesService } from "./VacationCalculatorBalancesService";

export class VacationBalanceService implements IVacationBalancesService {
    private vacationBalancesRepository: IVacationBalancesRepository;
    private usersRepository: IUserRepository;
    private vacationCalculatorBalancesService: IVacationCalculatorBalancesService;
    constructor() {
        this.vacationBalancesRepository = new VacationBalancesRepository();
        this.usersRepository = new UsersRepository();
        this.vacationCalculatorBalancesService = new VacationCalculatorBalancesService();
    }

    public  storeInitialBalance = async (userId: string): Promise<IVacationBalanceModel> => {

        const vacationBalanceEntity: IVacationBalanceEntity = this.vacationCalculatorBalancesService
            .getInitialBalance(userId);
        return await this.vacationBalancesRepository.store(vacationBalanceEntity);
    }
    public show = async (req: Request): Promise<IVacationBalanceModel | null>  => {
        return await this.vacationBalancesRepository.findByUserId(req.params.id) || null;
    }
    public  updateBalanceStoredVacation = async (req: Request): Promise<IVacationBalanceModel | null> => {
        const currentBalance: IVacationBalanceModel | null = await this.vacationBalancesRepository.findByUserId(
            req.params.userId,
        );
        if (currentBalance) {
            const vacationBalanceEntity: IVacationBalanceEntity = this.vacationCalculatorBalancesService
            .getBalanceStoredVacation(currentBalance, req);
            return await this.update(req.params.userId, vacationBalanceEntity);
        }
        return null;
    }
    public  updateBalanceUpdatedHiredDate =  async (req: Request): Promise<IVacationBalanceModel | null> => {
        const currentBalance: IVacationBalanceModel | null = await this.vacationBalancesRepository.findByUserId(
            req.params.userId,
        );
        const user: IUserModel | null = await this.usersRepository.findById(req.params.id);
        if (currentBalance && user) {
            const vacationBalanceEntity: IVacationBalanceEntity = this.vacationCalculatorBalancesService
            .getBalanceUpdatedHiredDate(req.params.id, currentBalance, user.hiredDate, req.body.hiredDate);
            return await this.update(req.params.id, vacationBalanceEntity);
        }
        return null;
    }
    public  updateBalanceUpdatedVacation = async (
        req: Request,
        currentVacation: IVacationModel,
        ): Promise<IVacationBalanceModel | null> =>  {
        const currentBalance: IVacationBalanceModel | null = await this.vacationBalancesRepository.findByUserId(
            req.params.userId,
        );
        if (currentBalance) {
            const vacationBalanceEntity: IVacationBalanceEntity = this.vacationCalculatorBalancesService
            .getBalanceUpdatedVacation(currentBalance, currentVacation, req);
            return await this.update(req.params.userId, vacationBalanceEntity);
        }
        return null;
    }
    public  updateBalanceDeletedVacation = async (
        req: Request,
        currentVacation: IVacationModel,
        ): Promise<IVacationBalanceModel | null> => {
        const currentBalance: IVacationBalanceModel | null = await this.vacationBalancesRepository.findByUserId(
            req.params.userId,
        );
        if (currentBalance) {
            const vacationBalanceEntity: IVacationBalanceEntity = this.vacationCalculatorBalancesService
            .getBalanceDeletedVacation(req, currentBalance, currentVacation);
            return await this.update(req.params.userId, vacationBalanceEntity);
        }
        return null;
    }
    public updateBalanceMonthly =  async (): Promise<IVacationBalanceModel[]> => {
        const balances = await this.vacationBalancesRepository.findAll();
        for (const balance of balances ) {
            const vacationBalanceEntity: IVacationBalanceEntity = this.vacationCalculatorBalancesService
            .getBalanceUpdatedMonthly(balance.userId, balance);
            await this.update(balance.userId, vacationBalanceEntity);
        }
        return await  await this.vacationBalancesRepository.findAll();
    }
    private  update = async (
        userId: string,
        vacationBalanceEntity: IVacationBalanceEntity,
    ): Promise<IVacationBalanceModel | null> => {
        return await this.vacationBalancesRepository.update(userId, vacationBalanceEntity);
    }
}
