import { Router } from "express";
import { IVacationsController } from "../controllers/interfaces/IVacationsController";
import { VacationsController } from "../controllers/VacationsController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { IAuthMiddleware} from "../middlewares/interfaces/IAuthMiddleware";
import { AbstractRouter } from "./AbstractRouter";

class VacationRouter extends AbstractRouter {
    constructor(
        public router: Router,
        private authMiddleware: IAuthMiddleware,
        private vacationsController: IVacationsController,
    ) {
        super(router);
        this.router.route("/users/:userId").get(this.authMiddleware.verify, this.vacationsController.index);
        this.router.route("/:id/users/:userId").get(this.authMiddleware.verify, this.vacationsController.show);
        this.router.route("/users/:userId").post(this.authMiddleware.verify, this.vacationsController.store);
        this.router.route("/:id/users/:userId/").put(this.authMiddleware.verify, this.vacationsController.update);
        this.router.route("/:id/users/:userId").delete(this.authMiddleware.verify, this.vacationsController.delete);
    }
}
const vacationRouter: VacationRouter = new VacationRouter(Router(), new AuthMiddleware(), new VacationsController());
export const vacationApi: Router = vacationRouter.getApiRouter;
