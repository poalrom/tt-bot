import TelegramBot from "node-telegram-bot-api";
import { Admin } from "../db/entities/Admin";
import { User } from "../db/entities/User";
import { Texts } from "../texts";
import { userBot } from "../userBot";

export async function addScoreCallback(bot: TelegramBot, admin: Admin, args: string) {
    const [login, score] = args.split(" ");

    if (score) {
        const user = await User.findOne({login});

        if (!user) {
            return;
        }

        user.score = user.score + Number(score);

        await user.save();

        userBot.sendMessage(user.chatId, Texts.add_score.replace("{1}", score).replace("{2}", String(user.score)));

        admin.currentCommand = "";
    } else {
        admin.currentCommand = `/addScore ${login}`;

        await bot.sendMessage(admin.chatId, "Сколько баллов добавить?");
    }

    await admin.save();
}