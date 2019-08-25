import { adminBot } from "../adminBot";
import { Admin } from "../db/entities/Admin";
import { User } from "../db/entities/User";
import { logger } from "../logger";
import { userBot } from "../userBot";
import { AdminCommands } from "./commands";

export async function cleanAnnonce(admin: Admin, text: string = "", args?: string) {
    const annonceText = args || text.replace(new RegExp(`^\\${AdminCommands.CLEAN_ANNONCE}`), "").trim();

    if (annonceText.length > 0) {
        const activeUsers = await User.find({ isActive: true });
        let sendedMessages = 0;

        await Promise.all(activeUsers.map(async (user) => {
            try {
                await userBot.sendMessage(user.chatId, annonceText);
                sendedMessages++;
            } catch (e) {
                logger.error(`adminBot: ${AdminCommands.CLEAN_ANNONCE}: ${e} `);
            }
        }));

        await adminBot.sendMessage(admin.chatId, `Сообщение отправлено ${sendedMessages} пользователям`);

        admin.currentCommand = "";
    } else {
        admin.currentCommand = AdminCommands.CLEAN_ANNONCE;
        await adminBot.sendMessage(admin.chatId, `Какое сообщение вы хотите отправить?`);
    }

    await admin.save();
}