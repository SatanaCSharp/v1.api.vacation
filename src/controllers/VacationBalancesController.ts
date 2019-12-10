import { IVacationBalancesService } from "./../services/interfaces/IVacationBalancesService";
import { VacationBalanceService } from "./../services/services.vacations/VacationBalancesService";
import { IVacationBalancesController } from "./interfaces/IVacationBalancesController";

export class VacationBalancesController implements IVacationBalancesController {
    private vacationBalanceService: IVacationBalancesService;
    constructor() {
        this.vacationBalanceService = new VacationBalanceService();
    }
    public updateBalanceMonthly = async (): Promise<void> => {
        await this.vacationBalanceService.updateBalanceMonthly();
    }
}
