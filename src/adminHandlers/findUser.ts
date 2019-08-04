import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";
import { AdminCommands } from "./commands";
import { Admin } from "../db/entities/Admin";
import { AdminUserKeyboard } from "../keyboards/AdminUserKeyboard";

export async function findUser(bot: TelegramBot, admin: Admin, msg: TelegramBot.Message) {
    const login = msg.text.replace(new RegExp(`^\\${AdminCommands.FIND}`), '').trim();

    console.log(login);

    if (login.length > 0) {
        const user = await User.findOne({ login });

        if (!user) {
            await bot.sendMessage(msg.chat.id, 'Пользователь не найден');

            return;
        }

        await bot.sendMessage(
            msg.chat.id,
            `Нашел ${user.firstName} ${user.lastName}(@${user.login}). Его счет: ${user.score}`,
            AdminUserKeyboard(admin, user),
        );
        admin.currentCommand = '';
    } else {
        admin.currentCommand = AdminCommands.FIND;
        await bot.sendMessage(msg.chat.id, `Какого пользователя найти?`);
    }

    await admin.save();
}