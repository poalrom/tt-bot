import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";
import { AdminCommands } from "./commands";
import { logger } from "../logger";
import { userBot } from "../userBot";
import { Admin } from "../db/entities/Admin";

export async function annonce(bot: TelegramBot, admin: Admin, msg: TelegramBot.Message) {
    const annonceText = msg.text.replace(new RegExp(`^\\${AdminCommands.ANNONCE}`), "").trim();

    if (annonceText.length > 0) {
        const activeUsers = await User.find({ isActive: true });
        let sendedMessages = 0;

        await Promise.all(activeUsers.map(async (user) => {
            try {
                await userBot.sendMessage(user.chatId, annonceText, { parse_mode: "Markdown" });
                sendedMessages++;
            } catch (e) {
                logger.error(`adminBot: ${AdminCommands.ANNONCE}: ${e} `);
            }
        }));

        await bot.sendMessage(msg.chat.id, `Сообщение отправлено ${sendedMessages} пользователям`);

        admin.currentCommand = "";
    } else {
        admin.currentCommand = AdminCommands.ANNONCE;
        await bot.sendMessage(msg.chat.id, `Какое сообщение вы хотите отправить?`);
    }

    await admin.save();
}