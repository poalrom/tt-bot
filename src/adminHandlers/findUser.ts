import { adminBot } from "../adminBot";
import { Admin } from "../db/entities/Admin";
import { User } from "../db/entities/User";
import { AdminUserKeyboard } from "../keyboards/AdminUserKeyboard";
import { AdminCommands } from "./commands";

export async function findUser(admin: Admin, text: string, args?: string) {
    const login = args || text.replace(new RegExp(`^\\${AdminCommands.FIND}`), "").trim();

    if (login.length > 0) {
        const user = await User.findOne({ login });

        if (!user) {
            admin.currentCommand = "";
            await admin.save();
            await adminBot.sendMessage(admin.chatId, "Пользователь не найден");

            return;
        }

        await adminBot.sendMessage(
            admin.chatId,
            `Нашел ${user.firstName} ${user.lastName}(@${user.login}). Его счет: ${user.score}`,
            AdminUserKeyboard(admin, user),
        );
        admin.currentCommand = "";
    } else {
        admin.currentCommand = AdminCommands.FIND;
        await adminBot.sendMessage(admin.chatId, `Какого пользователя найти?`);
    }

    await admin.save();
}