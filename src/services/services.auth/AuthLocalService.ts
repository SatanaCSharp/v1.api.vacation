import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { IUserEntity } from "../../entities/interfaces/IUserEntity";
import {UserEntity} from "../../entities/UserEntity";
import {IMapRequestToEntity} from "../../mappers/interfaces/IMapRequestToEntity";
import { UserMapper } from "../../mappers/UserMapper";
import {IUserRepository} from "../../repositories/interfaces/IUserRepository";
import {UsersRepository} from "../../repositories/UsersRepository";
import { IUserModel } from "../../schemas/interfaces/IUserModel";
import {jwtService} from "../../util/JwtService";
import { IAuthService } from "../interfaces/IAuthService";
import {IVacationBalancesService} from "../interfaces/IVacationBalancesService";
import {VacationBalanceService} from "../services.vacations/VacationBalancesService";

export class AuthLocalService implements IAuthService {
    private usersRepository: IUserRepository;
    private userMapper: IMapRequestToEntity<Request, IUserEntity>;
    private vacationBalanceServices: IVacationBalancesService;
    constructor() {
        this.userMapper = new UserMapper(new UserEntity());
        this.usersRepository = new UsersRepository();
        this.vacationBalanceServices = new VacationBalanceService();
    }
    public signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
        return passport.authenticate("local", { session: false }, (err, user) => {
            if (err) {
                return next(err);
            }
            if (user) {
                return res.json({ user: jwtService.authJSON(user) });
            }
            return res.sendStatus(400);
        })(req, res, next);
    }
    public  signUp = async (req: Request, res: Response): Promise<Response> => {
        try {
            const userEntity: IUserEntity = this.userMapper.mapRequestToEntity(req);
            const user: IUserModel = await this.usersRepository.store(userEntity);
            await this.vacationBalanceServices.storeInitialBalance(user._id);
            return res.json({ user: await jwtService.authJSON(user) });
        } catch (err) {
            return res.sendStatus(500);
        }
    }
}
