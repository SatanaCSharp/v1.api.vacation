import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { IAuthController } from "../controllers/interfaces/IAuthController";
import { ISignUserMiddleware } from "../middlewares/interfaces/ISignUserMiddleware";
import { SignInMiddleware } from "../middlewares/SignInMiddleware";
import { SignUpMiddleware } from "../middlewares/SignUpMiddleware";
import { AbstractRouter } from "./AbstractRouter";

class AuthRouter extends AbstractRouter {

    constructor(
        public router: Router,
        private signUpMiddleware: ISignUserMiddleware,
        private signInMiddleware: ISignUserMiddleware,
        private authController: IAuthController,
    ) {
        super(router);
        this.router.route("/sign_in").post(this.signInMiddleware.validateRequest, this.authController.signIn);
        this.router.route("/sign_up").post(this.signUpMiddleware.validateRequest, this.authController.signUp);
    }
}
const authRouter: AuthRouter = new AuthRouter(
    Router(), new SignUpMiddleware(),
    new SignInMiddleware(),
    new AuthController(),
);
export const authApi: Router = authRouter.getApiRouter;
