import { Request, Response } from "express";
import { IUserEntity } from "../../entities/interfaces/IUserEntity";
import {UserEntity} from "../../entities/UserEntity";
import {IMapRequestToEntity} from "../../mappers/interfaces/IMapRequestToEntity";
import { UserMapper } from "../../mappers/UserMapper";
import {IUserRepository} from "../../repositories/interfaces/IUserRepository";
import {UsersRepository} from "../../repositories/UsersRepository";
import {IUserModel} from "../../schemas/interfaces/IUserModel";
import {IVacationBalanceModel} from "../../schemas/interfaces/IVacationBalanceModel";
import { IUsersService } from "../interfaces/IUsersService";
import {IVacationBalancesService} from "../interfaces/IVacationBalancesService";
import {VacationBalanceService} from "../services.vacations/VacationBalancesService";

export class UsersService implements IUsersService {
    private usersRepository: IUserRepository;
    private userMapper: IMapRequestToEntity<Request, IUserEntity>;
    private vacationBalancesService: IVacationBalancesService;
    constructor() {
        this.usersRepository = new UsersRepository();
        this.userMapper = new UserMapper(new UserEntity());
        this.vacationBalancesService = new VacationBalanceService();
    }
    public  show = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: IUserModel | null = await this.usersRepository.findById(req.params.id);
            const vacationBalance: IVacationBalanceModel| null = await this.vacationBalancesService.show(req);
            res.send({user, vacationBalance});
        } catch (err) {
            res.sendStatus(500);
        }
    }
    public  update = async (req: Request, res: Response): Promise<void> => {
        try {
            await this.vacationBalancesService.updateBalanceUpdatedHiredDate(req);
            const vacationBalance: IVacationBalanceModel| null = await this.vacationBalancesService.show(req);
            const userEntity: IUserEntity = this.userMapper.mapRequestToEntity(req);
            const user: IUserModel | null = await this.usersRepository.update(req.params.id, userEntity);
            res.send({user, vacationBalance});
        } catch (err) {
            res.sendStatus(500);
        }
    }
}
