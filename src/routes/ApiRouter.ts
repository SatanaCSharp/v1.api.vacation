import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { RoutesMiddleware } from "../middlewares/RoutesMiddleware";
import * as swaggerDocument from "../swagger.json";
import { AbstractRouter } from "./AbstractRouter";
import { authApi } from "./AuthRouter";
import { IApiRouter } from "./interfaces/ApiRouter";
import { userApi } from "./UserRouter";
export class ApiRouter extends AbstractRouter {
    constructor(public router: Router, private routes: IApiRouter[]) {
        super(router);
        this.setupApiRoutes(this.routes);
    }
    private addApiRouter(url: string, router: Router) {
        this.router.use(url, router);
    }

    private setupApiRoutes(routes: IApiRouter[]) {
        routes.forEach((route) => {
            this.addApiRouter(route.url, route.router);
        });
        this.router.use("/api_docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.router.get("/", RoutesMiddleware.rootRedirect);
        this.router.use(RoutesMiddleware.unauthorized);
        this.router.all("*", RoutesMiddleware.notFound);
    }
}

const apiRoutes: IApiRouter[] = [
    { url: "/auth", router: authApi },
    { url: "/users", router: userApi },
    ];

export const apiRouter = new ApiRouter(Router(), apiRoutes);
