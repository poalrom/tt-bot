import { config } from "../config";
import { db } from "../db";
import { User } from "../db/entities/User";
import { UserKeyboard } from "../keyboards/UserKeyboard";
import { Texts } from "../texts";
import { userBot } from "../userBot";

export async function leaderboardHandler(user: User) {
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

    userBot.sendMessage(user.chatId, message, UserKeyboard(user));
}