import cron from "node-cron";
import { IVacationBalancesController } from "./../controllers/interfaces/IVacationBalancesController";
import { VacationBalancesController } from "./../controllers/VacationBalancesController";

export const runVacationCron =   () => {
    cron.schedule("0 0 0 1 1-12 *", () => {
        const vacationBalancesController: IVacationBalancesController = new VacationBalancesController();
        vacationBalancesController.updateBalanceMonthly();
    });
};
