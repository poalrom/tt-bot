import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";
import { Texts } from "../texts";
import { StartKeyboard } from "../keyboards/StartKeyboard";
import { UserState } from "../types/UserState";

export async function returnHandler(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    await user.resetState();
    
    bot.sendMessage(msg.chat.id, Texts.return_message, StartKeyboard(user));
}