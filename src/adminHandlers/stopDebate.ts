import { adminBot } from "../adminBot";
import { Admin } from "../db/entities/Admin";
import { Debate } from "../db/entities/Debate";

export async function stopDebate(admin: Admin, text: string = "") {
    const debate = await Debate.findOne({ isActive: true }, { order: { id: "ASC" } });
    if (!debate) {
        await adminBot.sendMessage(admin.chatId, `Активные дебаты не найдены`);
        return;
    }

    debate.isActive = false;
    await debate.save();
    adminBot.sendMessage(admin.chatId, `Дебаты "${debate.theme}" остановлены`);
}