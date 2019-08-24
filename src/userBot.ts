import TelegramBot from "node-telegram-bot-api";

import { User } from "./db/entities/User";
import { logger } from "./logger";
import { Texts } from "./texts";

import { Commands } from "./commands";
import { IUserRouter } from "./types/Router";
import { answerQuestion } from "./userHandlers/answerQuestion";
import { dummyHandler } from "./userHandlers/dummyHandler";
import { leaderboardHandler } from "./userHandlers/leaderboardHandler";
import { nextQuestion } from "./userHandlers/nextQuestion";
import { onStandHandler } from "./userHandlers/onStandHandler";
import { schedule } from "./userHandlers/schedule";
import { start } from "./userHandlers/start";
import { startOnline } from "./userHandlers/startOnline";
import { vote } from "./userHandlers/vote";
import { getCallbackCommand } from "./utils/getCallbackCommand";

const userMessageRouter: IUserRouter = {
    // Commands
    [Texts.start_command]: start,
    [Texts.start_online_command]: startOnline,
    [Texts.next_question_command]: nextQuestion,
    [Texts.schedule_command]: schedule,
    [Texts.leaderboard_command]: leaderboardHandler,
    [Texts.stand_command]: onStandHandler,
};

const userCallbackRouter: IUserRouter = {
    // Callbacks
    [Commands.answer_question_command]: answerQuestion,
    [Commands.debate_vote_command]: vote,
};

export let userBot: TelegramBot;

export function initUserBot() {
    userBot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

    userBot.on("polling_error", (e) => logger.error(`userBot: ${e}`, e));

    userBot.on("message", async (msg) => {
        const user = await User.identify(msg);

        logger.info(`userBot: Receive message ${msg.message_id}: "${msg.text}" from ${user.login}`, msg);

        if (userMessageRouter.hasOwnProperty(msg.text)) {
            try {
                return await userMessageRouter[msg.text](user, msg.text);
            } catch (e) {
                return await dummyHandler(user);
            }
        }

        return await dummyHandler(user);
    });

    userBot.on("callback_query", async (query) => {
        const user = await User.identify(query);

        logger.info(`userBot: Receive callback ${query.id}: "${query.message.text}" from ${user.login}`, query);

        const commandData = getCallbackCommand(query);

        if (!commandData || !userCallbackRouter.hasOwnProperty(commandData.command)) {
            try {
                return await userBot.answerCallbackQuery(
                    query.id,
                    { text: Texts.unknown_command_response }
                );
            } catch (e) {
                return await userBot.answerCallbackQuery(query.id, { text: e });
            }
        }

        try {
            await userCallbackRouter[commandData.command](user, commandData.args);
            await userBot.answerCallbackQuery(query.id, { text: Texts.success_callback_answer });
        } catch (e) {
            await userBot.answerCallbackQuery(query.id, { text: e });
        }
    });

    logger.info("userBot: User bot started");
}