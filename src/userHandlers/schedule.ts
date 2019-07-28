import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";
import { Texts } from "../texts";

export async function schedule(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    bot.sendMessage(msg.chat.id, Texts.schedule_message);
}