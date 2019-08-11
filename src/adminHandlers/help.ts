import { adminBot } from "../adminBot";
import { Admin } from "../db/entities/Admin";
import { AdminCommands } from "./commands";

export async function help(admin: Admin) {
    adminBot.sendMessage(admin.chatId, `
Доступные команды:
*${AdminCommands.ANNONCE} {text}* - Отправить текст всем
*${AdminCommands.FIND} {login}* - Найти участника
*${AdminCommands.START_DEBATE}* - Начать дебаты
*${AdminCommands.STOP_DEBATE}* - Закончить текущие дебаты
    `, { parse_mode: "Markdown" });
}