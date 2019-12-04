
import bodyParser from "body-parser";
import cors from "cors";
import errorHandler from "errorhandler";
import express from "express";
import mongoose from "mongoose";
import { config } from "../../config";
// import { apiRouter } from "../../routes/ApiRouter";
// import { PassportService } from "../services.passport/PassportService";

export class AppService {
    public static run() {
        // PassportService.authenticateLocally();
        const app = express();
        mongoose.set("useCreateIndex", true);
        mongoose.connect(config.db.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true});
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json({ limit: "50mb" }));
        app.use(cors());
        app.use(errorHandler());
        // app.use(apiRouter.getApiRouter);
        app.listen(config.server.port, () => {
            // tslint:disable-next-line:no-console
            console.log(`App running on ${config.server.baseUrl}`);
        });
    }
}
