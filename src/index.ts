process.env.NTBA_FIX_319 = "1";

import { initAdminBot } from "./adminBot";
import { initDB } from "./db";
import { logger } from "./logger";
import { initUserBot } from "./userBot";

initDB()
    .then(() => {
        logger.info("Connected to DB. Starting bots");

        initUserBot();
        initAdminBot();
    })
    .catch(error => logger.error(error));