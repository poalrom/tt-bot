import TelegramBot from "node-telegram-bot-api";

import { UserState } from "./types/UserState";
import { IRouter } from "./types/Router";

import { User } from "./db/entities/User";
import { logger } from "./logger";
import { Texts } from "./texts";

import { start } from "./userHandlers/start";
import { answerQuestion } from "./userHandlers/answerQuestion";
import { dummyHandler } from "./userHandlers/dummyHandler";
import { startOnline } from "./userHandlers/startOnline";
import { startOffline } from "./userHandlers/startOffline";
import { returnHandler } from "./userHandlers/returnHandler";
import { schedule } from "./userHandlers/schedule";

const userRouter: IRouter = {
    [Texts.start_command]: start,
    [Texts.start_online_command]: startOnline,
    [Texts.start_offline_command]: startOffline,
    [Texts.return_command]: returnHandler,
    [Texts.schedule_command]: schedule,
};

export function initUserBot() {
    const userBot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

    userBot.on("polling_error", (e) => logger.error(e));

    userBot.on("message", async (msg) => {
        const user = await User.identify(msg);

        logger.info(`Receive message ${msg.message_id}: "${msg.text}" from ${user.login}`);

        if (msg.text in userRouter) {
            return await userRouter[msg.text](userBot, user, msg);
        }

        if (user.state === UserState.AnsweringOnline) {
            return await answerQuestion(userBot, user, msg);
        }

        await dummyHandler(userBot, user, msg);
    });

    logger.info("User bot started");
}