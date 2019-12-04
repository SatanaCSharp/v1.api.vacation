import { Request, Response } from "express";
import { IUserEntity } from "../../entities/interfaces/IUserEntity";
import {UserEntity} from "../../entities/UserEntity";
import {IMapRequestToEntity} from "../../mappers/interfaces/IMapRequestToEntity";
import { UserMapper } from "../../mappers/UserMapper";
import {IUserRepository} from "../../repositories/interfaces/IUserRepository";
import {UsersRepository} from "../../repositories/UsersRepository";
import {IUserModel} from "../../schemas/interfaces/IUserModel";
import { IUsersService } from "../interfaces/IUsersService";



export class UsersService implements IUsersService {
    private usersRepository: IUserRepository;
    private userMapper: IMapRequestToEntity<Request, IUserEntity>;
    constructor() {
        this.usersRepository = new UsersRepository();
        this.userMapper = new UserMapper(new UserEntity());
    }
    public  show = async (req: Request, res: Response): Promise<void> => {
        try {
            const user: IUserModel | null = await this.usersRepository.findById(req.params.id);
            res.send({user});
        } catch (err) {
            res.sendStatus(500);
        }
    }
    public  update = async (req: Request, res: Response): Promise<void> => {
        try {
            const userEntity: IUserEntity = this.userMapper.mapRequestToEntity(req);
            const user: IUserModel | null = await this.usersRepository.update(req.params.id, userEntity);
            res.send({user});
        } catch (err) {
            res.sendStatus(500);
        }
    }
}
