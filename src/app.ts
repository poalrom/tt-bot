import express from "express";

import { stats } from "./appHandlers/stats";
import { tour2 } from "./appHandlers/tour2";
import { tour3 } from "./appHandlers/tour3";
import { initDB } from "./db";
import { logger } from "./logger";

const port = process.env.APP_PORT || 3000;

initDB()
    .then(() => {
        logger.info("Connected to DB. Starting server");

        express()
            .use(express.json())
            .use(express.urlencoded({ extended: true }))
            .get("/", (_, res) => {
                res.sendFile(`${__dirname}/appHandlers/index.html`);
            })
            .get("/tour2", (_, res) => {
                res.sendFile(`${__dirname}/appHandlers/tour2.html`);
            })
            .get("/tour3", (_, res) => {
                res.sendFile(`${__dirname}/appHandlers/tour3.html`);
            })
            .get("/stats", stats)
            .get("/tour2-stats", tour2)
            .get("/tour3-stats", tour3)
            .listen(port, () => {
                logger.info(`Example app listening on port ${port}!`);
                logger.info(`http://localhost:${port}`);
            });
    })
    .catch(error => logger.error(error));

process.on("uncaughtException", e => {
    logger.error(e);
    process.exit(1);
});
process.on("unhandledRejection", e => {
    logger.error(e);
    process.exit(1);
});