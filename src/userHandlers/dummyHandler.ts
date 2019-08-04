import TelegramBot from "node-telegram-bot-api";
import { Texts } from "../texts";

export async function dummyHandler(bot: TelegramBot, msg: TelegramBot.Message) {
    bot.sendMessage(msg.chat.id, Texts.unknown_command_response);
}