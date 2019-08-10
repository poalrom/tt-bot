import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";
import { Texts } from "../texts";
import { StartKeyboard } from "../keyboards/StartKeyboard";
import { db } from "../db";
import { config } from "../config";

export async function leaderboardHandler(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    const positionField = "pos";
    const positions = await db.query(`
        SELECT ${positionField}
        FROM (
            SELECT login, last_answer_timestamp, ROW_NUMBER() over(order by score DESC, last_answer_timestamp ASC) as ${positionField} FROM public.user
        ) result
        WHERE login = '${user.login}';
    `);
    const userPosition: string = positions.length ? positions[0][positionField] : "последний";

    let message = Texts.leaderboard_command_response.replace("{1}", userPosition).replace("{2}", String(user.score));

    if (!config.infiniteMod) {
        message += `\n`;
        message += user.score >= config.scoreForFinal ?
            Texts.finite_mode_completed :
            Texts.finite_mode_not_completed.replace("{1}", String(config.scoreForFinal - user.score));
    }

    bot.sendMessage(msg.chat.id, message, StartKeyboard(user));
}