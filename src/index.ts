process.env.NTBA_FIX_319 = "1";

import { createConnection } from "typeorm";

import { logger } from "./logger";
import { ormConfig } from "./ormconfig";
import { initUserBot } from "./userBot";

createConnection(ormConfig)
    .then(() => {
        logger.info("Connected to DB. Starting bots");

        initUserBot();
    })
    .catch(error => logger.error(error));