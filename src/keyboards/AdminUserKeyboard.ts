import { InlineKeyboard } from "node-telegram-keyboard-wrapper";
import { User } from "../db/entities/User";
import { Answer } from "../db/entities/Answer";
import { Admin } from "../db/entities/Admin";
import { config } from "../config";

export function AdminUserKeyboard(admin: Admin, user: User, answers?: Answer[]) {
    const keyboard = new InlineKeyboard();

    keyboard.addRow({
        text: 'Добавить баллов',
        callback_data: `/addScore ${user.login}`
    });

    keyboard.addRow({
        text: 'Перевести во 2 этап',
        callback_data: `/moveToFinal ${user.login}`
    });

    return keyboard.build();
}