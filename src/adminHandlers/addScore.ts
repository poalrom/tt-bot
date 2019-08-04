import TelegramBot from "node-telegram-bot-api";
import { Admin } from "../db/entities/Admin";
import { addScoreCallback } from '../adminCallbacks/addScoreCallback';
import { AdminCommands } from "./commands";

export async function addScore(bot: TelegramBot, admin: Admin, msg: TelegramBot.Message) {
    if (!msg.text.match(/^\d+$/)) {
        await addScoreCallback(bot, admin, msg.text);
    } else {
        await addScoreCallback(bot, admin, `${admin.currentCommand.replace(AdminCommands.ADD_SCORE, '').trim()} ${msg.text}`);
    }

    bot.sendMessage(admin.chatId, 'Готово');
}