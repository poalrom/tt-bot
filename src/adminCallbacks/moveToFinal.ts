import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";
import { Admin } from "../db/entities/Admin";
import { config } from "../config";

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