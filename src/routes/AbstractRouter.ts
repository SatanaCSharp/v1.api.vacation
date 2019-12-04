import { Router } from "express";

export class AbstractRouter {
    constructor(public router: Router) {}

    public get getApiRouter(): Router {
        return this.router;
    }
}
