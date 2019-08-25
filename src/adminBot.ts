import TelegramBot from "node-telegram-bot-api";

import { logger } from "./logger";

import { annonce } from "./adminHandlers/annonce";
import { changeUserState } from "./adminHandlers/changeUserState";
import { cleanAnnonce } from "./adminHandlers/cleanAnnonce";
import { AdminCommands } from "./adminHandlers/commands";
import { findUser } from "./adminHandlers/findUser";
import { help } from "./adminHandlers/help";
import { startDebate } from "./adminHandlers/startDebate";
import { stopDebate } from "./adminHandlers/stopDebate";
import { Admin } from "./db/entities/Admin";
import { IAdminRouter } from "./types/Router";
import { getCallbackCommand } from "./utils/getCallbackCommand";

const adminRouter: IAdminRouter = {
    [AdminCommands.ANNONCE]: annonce,
    [AdminCommands.FIND]: findUser,
    [AdminCommands.START_DEBATE]: startDebate,
    [AdminCommands.STOP_DEBATE]: stopDebate,
    [AdminCommands.CLEAN_ANNONCE]: cleanAnnonce,
};

const adminCallbackRouter: IAdminRouter = {
    [AdminCommands.CHANGE_USER_STATE]: changeUserState
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

        const { command, args } = getCallbackCommand(query);

        if (!adminCallbackRouter.hasOwnProperty(command)) {
            return await adminBot.answerCallbackQuery(query.id, { text: "Unknown command" });
        }

        try {
            await adminCallbackRouter[command](admin, args);
            await adminBot.answerCallbackQuery(query.id, { text: "Done" });
        } catch (e) {
            await adminBot.answerCallbackQuery(query.id, { text: e });
        }
    });

    adminBot.on("message", async (msg) => {
        const admin = await Admin.identify(msg);
        if (!admin) {
            adminBot.sendMessage(msg.chat.id, "У тебя нет доступа к этому боту. Сорян :(");

            return;
        }

        logger.info(`adminBot: Receive message ${msg.message_id}: "${msg.text}" from ${msg.from.username}`, msg);

        let currentRoute = Object.keys(adminRouter).find((route) => admin.currentCommand.match(route));

        if (currentRoute) {
            try {
                return await adminRouter[currentRoute](admin, admin.currentCommand, msg.text);
            } catch (error) {
                admin.currentCommand = "";
                await admin.save();

                return await adminBot.sendMessage(admin.chatId, "Что-то пошло не так");
            }
        }

        currentRoute = Object.keys(adminRouter).find((route) => msg.text.match(route));

        if (currentRoute) {
            try {
                return await adminRouter[currentRoute](admin, msg.text);
            } catch (error) {
                admin.currentCommand = "";
                await admin.save();

                return await adminBot.sendMessage(admin.chatId, "Что-то пошло не так");
            }
        }

        return await help(admin);
    });

    logger.info("adminBot: Admin bot started");
}