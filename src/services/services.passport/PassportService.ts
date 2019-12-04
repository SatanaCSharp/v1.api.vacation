import passport from "passport";
import * as passportLocal from "passport-local";
import { PassportLocalService } from "./PassportLocalService";

export class PassportService {
    public static authenticateLocally() {
        const passportLocalService: PassportLocalService = new PassportLocalService();
        const LocalStrategy = passportLocal.Strategy;
        passport.use("local", new LocalStrategy(passportLocalService.credentials, passportLocalService.handler));
    }
}
