import { AppService } from "./services/services.util/AppService";
import { runVacationCron } from "./util/Cron";
import { util } from "./util/Util";

util.handleAsyncExceptions();
AppService.run();
runVacationCron();
