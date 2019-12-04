import { AppService } from "./services/services.util/AppService";
import { util } from "./util/Util";

util.handleAsyncExceptions();
AppService.run();
