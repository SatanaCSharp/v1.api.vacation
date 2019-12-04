import * as dotEnv from "dotenv";
dotEnv.config();

export const config = {
    auth: {
        tokenLifetime: 7200000,
    },
    db: {
        mongo: {
            url: process.env.DB_MONGO_URL || "mongodb://localhost:27017/Vacation",
        },
    },
    headers: {
        authToken: "auth-token",
    },
    secret: process.env.APP_SECRET || "event_atlas_secret_rfn11",
    server: {
        host: process.env.HOST || "127.0.0.1",
        port: process.env.PORT || 5000,
        baseUrl: process.env.BASE_URL || "http://localhost:5000",
    },
};
