import { adminBot } from "../adminBot";
import { Admin } from "../db/entities/Admin";
import { AdminCommands } from "./commands";

export async function help(admin: Admin) {
    adminBot.sendMessage(admin.chatId, `
Доступные команды:
*${AdminCommands.ANNONCE} {text}* - Отправить текст всем
*${AdminCommands.FIND} {login}* - Найти участника
    `, { parse_mode: "Markdown" });
}