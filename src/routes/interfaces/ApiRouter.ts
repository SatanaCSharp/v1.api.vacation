import { Router } from "express";

export interface IApiRouter {
    url: string;
    router: Router;
}
