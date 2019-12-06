import { Request, Response } from "express";
import { IUsersService } from "../services/interfaces/IUsersService";
import { UsersService } from "../services/services.users/UsersService";
import { IUsersController } from "./interfaces/IUsersController";

export class UsersController implements IUsersController {
    private usersService: IUsersService;
    constructor() {
        this.usersService = new UsersService();
    }
    public  show = async (req: Request, res: Response): Promise<void> => {
        await this.usersService.show(req, res);
    }

    public  update = async (req: Request, res: Response): Promise<void> => {
        await this.usersService.update(req, res);
    }
}
