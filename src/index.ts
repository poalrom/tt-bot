process.env.NTBA_FIX_319 = "1";

import { logger } from "./logger";
import { initUserBot } from "./userBot";
import { initDB } from "./db";

initDB()
    .then(() => {
        logger.info("Connected to DB. Starting bots");

        initUserBot();
    })
    .catch(error => logger.error(error));