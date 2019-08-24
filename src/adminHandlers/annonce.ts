import { adminBot } from "../adminBot";
import { Admin } from "../db/entities/Admin";
import { User } from "../db/entities/User";
import { logger } from "../logger";
import { userBot } from "../userBot";
import { AdminCommands } from "./commands";

export async function annonce(admin: Admin, text: string = "", args?: string) {
    const annonceText = args || text.replace(new RegExp(`^\\${AdminCommands.ANNONCE}`), "").trim();

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

        await adminBot.sendMessage(admin.chatId, `Сообщение отправлено ${sendedMessages} пользователям`);

        admin.currentCommand = "";
    } else {
        admin.currentCommand = AdminCommands.ANNONCE;
        await adminBot.sendMessage(admin.chatId, `Какое сообщение вы хотите отправить?`);
    }

    await admin.save();
}