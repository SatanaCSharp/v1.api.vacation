import { Router } from "express";
import { IUsersController } from "../controllers/interfaces/IUsersController";
import { UsersController } from "../controllers/UsersController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import {IAuthMiddleware} from "../middlewares/interfaces/IAuthMiddleware";
import { AbstractRouter } from "./AbstractRouter";

class UserRouter extends AbstractRouter {

    constructor(
        public router: Router,
        private authMiddleware: IAuthMiddleware,
        private usersController: IUsersController,
    ) {
        super(router);
        this.router.route("/:id").get(this.authMiddleware.verify, this.usersController.show);
        this.router.route("/:id").put(this.authMiddleware.verify, this.usersController.update);
    }
}
const userRouter: UserRouter = new UserRouter(Router(), new AuthMiddleware(), new UsersController());
export const userApi: Router = userRouter.getApiRouter;
