import TelegramBot from "node-telegram-bot-api";

import { UserState } from "./types/UserState";

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
import { leaderboardHandler } from "./userHandlers/leaderboardHandler";
import { IUserRouter, IAdminRouter } from "./types/Router";

const userRouter: IUserRouter = {
    [Texts.start_command]: start,
    [Texts.start_online_command]: startOnline,
    [Texts.start_offline_command]: startOffline,
    [Texts.switch_to_online_command]: startOffline,
    [Texts.switch_to_offline_command]: startOffline,
    [Texts.return_command]: returnHandler,
    [Texts.schedule_command]: schedule,
    [Texts.leaderboard_command]: leaderboardHandler,
    [Texts.next_question_command]: answerQuestion,
};

export let userBot: TelegramBot;

export function initUserBot() {
    userBot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

    userBot.on("polling_error", (e) => logger.error(`userBot: ${e}`, e));

    userBot.on("message", async (msg) => {
        const user = await User.identify(msg);

        logger.info(`userBot: Receive message ${msg.message_id}: "${msg.text}" from ${user.login}`, msg);

        if (userRouter.hasOwnProperty(msg.text)) {
            return await userRouter[msg.text](userBot, user, msg);
        }

        if (user.state === UserState.AnsweringOnline) {
            return await answerQuestion(userBot, user, msg);
        }

        return await dummyHandler(userBot, msg);
    });

    logger.info("userBot: User bot started");
}