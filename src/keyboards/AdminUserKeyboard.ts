import { InlineKeyboard } from "node-telegram-keyboard-wrapper";
import { config } from "../config";
import { Admin } from "../db/entities/Admin";
import { Answer } from "../db/entities/Answer";
import { User } from "../db/entities/User";
import { UserState } from "../types/UserState";

export function AdminUserKeyboard(admin: Admin, user: User) {
    const keyboard = new InlineKeyboard();

    if (user.state === UserState.FinishedOnline) {
        keyboard.addRow({
            text: "Выдать приз за онлайн викторину",
            callback_data: `/changeUserState ${user.chatId} ${UserState.ReceivedOnlineGift}`,
        });
        keyboard.addRow({
            text: "Перевести в оффлайн",
            callback_data: `/changeUserState ${user.chatId} ${UserState.MovedToOffline}`,
        });
    }

    if (user.state === UserState.MovedToOffline) {
        keyboard.addRow({
            text: "Выдать приз за оффлайн тур",
            callback_data: `/changeUserState ${user.chatId} ${UserState.ReceivedOfflineGift}`,
        });
        keyboard.addRow({
            text: "Перевести в финал",
            callback_data: `/changeUserState ${user.chatId} ${UserState.MovedToFinal}`,
        });
    }

    if (user.state === UserState.MovedToFinal) {
        keyboard.addRow({
            text: "Выдать приз за финал",
            callback_data: `/changeUserState ${user.chatId} ${UserState.ReceivedFinalGift}`,
        });
    }

    return keyboard.build();
}