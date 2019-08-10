process.env.NTBA_FIX_319 = "1";

import { logger } from "./logger";
import { initUserBot } from "./userBot";
import { initDB } from "./db";
import { initAdminBot } from "./adminBot";

initDB()
    .then(() => {
        logger.info("Connected to DB. Starting bots");

        initUserBot();
        initAdminBot();
    })
    .catch(error => logger.error(error));