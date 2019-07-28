import TelegramBot from "node-telegram-bot-api";
import { StartKeyboard } from "../keyboards/StartKeyboard";
import { User } from "../db/entities/User";
import { logger } from "../logger";
import { Texts } from "../texts";

export async function start(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    logger.info(`start: Start session for ${user.login}`, msg);

    await user.resetState();

    bot.sendMessage(msg.chat.id, Texts.start_command_response, StartKeyboard(user));
}