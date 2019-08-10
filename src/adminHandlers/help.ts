import TelegramBot from "node-telegram-bot-api";
import { AdminCommands } from "./commands";

export async function help(bot: TelegramBot, msg: TelegramBot.Message) {
    bot.sendMessage(msg.chat.id, `
Доступные команды:
*${AdminCommands.ANNONCE} {text}* - Отправить текст всем
*${AdminCommands.ADD_SCORE} {login} {score}* - Добавить баллов участнику
*${AdminCommands.FIND} {login}* - Найти участника
    `, { parse_mode: "Markdown" });
}