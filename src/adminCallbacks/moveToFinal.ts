import TelegramBot from "node-telegram-bot-api";
import { config } from "../config";
import { Admin } from "../db/entities/Admin";
import { User } from "../db/entities/User";

export async function moveToFinal(bot: TelegramBot, admin: Admin, login: string) {
    const user = await User.findOne({login});

    if (!user) {
        return;
    }

    if (user.score < config.scoreForFinal) {
        user.score = config.scoreForFinal;
        user.last_answer_timestamp = Date.now();

        await user.save();
    }
}