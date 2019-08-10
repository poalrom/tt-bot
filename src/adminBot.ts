import TelegramBot from "node-telegram-bot-api";

import { logger } from "./logger";

import { IAdminRouter, IAdminCallbackRouter } from "./types/Router";
import { help } from "./adminHandlers/help";
import { annonce } from "./adminHandlers/annonce";
import { Admin } from "./db/entities/Admin";
import { addScoreCallback } from "./adminCallbacks/addScoreCallback";
import { AdminCommands } from "./adminHandlers/commands";
import { findUser } from "./adminHandlers/findUser";
import { addScore } from "./adminHandlers/addScore";

const adminRouter: IAdminRouter = {
    [AdminCommands.ADD_SCORE]: addScore,
    [AdminCommands.ANNONCE]: annonce,
    [AdminCommands.FIND]: findUser,
};

const adminCallbackRouter: IAdminCallbackRouter = {
    "/addScore": addScoreCallback,
};

export let adminBot: TelegramBot;

export function initAdminBot() {
    adminBot = new TelegramBot(process.env.ADMIN_BOT_TOKEN, { polling: true, onlyFirstMatch: true });

    adminBot.on("polling_error", (e) => logger.error(`adminBot: ${e}`, e));

    adminBot.on("callback_query", async (query) => {
        const admin = await Admin.identify(query);

        if (!admin) {
            adminBot.sendMessage(query.from.id, "У тебя нет доступа к этому боту. Сорян :(");

            return;
        }

        const commandMatcher = query.data.match(/^(\/\S+) (.+)/);

        if (!commandMatcher) {
            return await adminBot.answerCallbackQuery(query.id, { text: "Unknown command" });
        }

        const [, command, args] = commandMatcher;

        if (!adminCallbackRouter.hasOwnProperty(command)) {
            return await adminBot.answerCallbackQuery(query.id, { text: "Unknown command" });
        }

        await adminCallbackRouter[command](adminBot, admin, args);

        await adminBot.answerCallbackQuery(query.id, { text: "Done" });
    });

    adminBot.onText(/\/find (.+)/, async (msg) => {
        const admin = await Admin.identify(msg);

        if (!admin) {
            adminBot.sendMessage(msg.chat.id, "У тебя нет доступа к этому боту. Сорян :(");

            return;
        }

        findUser(adminBot, admin, msg);
    });

    adminBot.onText(/\/annonce (.+)/, async (msg) => {
        const admin = await Admin.identify(msg);

        if (!admin) {
            adminBot.sendMessage(msg.chat.id, "У тебя нет доступа к этому боту. Сорян :(");

            return;
        }

        annonce(adminBot, admin, msg);
    });

    adminBot.onText(/.*/, async (msg) => {
        const admin = await Admin.identify(msg);
        if (!admin) {
            adminBot.sendMessage(msg.chat.id, "У тебя нет доступа к этому боту. Сорян :(");

            return;
        }

        logger.info(`adminBot: Receive message ${msg.message_id}: "${msg.text}" from ${msg.from.username}`, msg);

        let currentRoute = Object.keys(adminRouter).find((route) => admin.currentCommand.match(route));

        if (!currentRoute) {
            currentRoute = Object.keys(adminRouter).find((route) => msg.text.match(route));
        }

        if (currentRoute) {
            return await adminRouter[currentRoute](adminBot, admin, msg);
        }

        return await help(adminBot, msg);
    });

    logger.info("adminBot: Admin bot started");
}