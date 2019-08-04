import { ReplyKeyboard } from "node-telegram-keyboard-wrapper";
import { Texts } from "../texts";
import { User } from "../db/entities/User";
import { UserState } from "../types/UserState";

export function StartKeyboard(user: User) {
    const keyboard = new ReplyKeyboard();

    if (user.state !== UserState.Finished) {
        keyboard.addRow(Texts.start_online_command);
    }

    keyboard.addRow(Texts.leaderboard_command);

    if (user.state !== UserState.Finished) {
        keyboard.addRow(Texts.start_offline_command);
    }

    keyboard.addRow(Texts.schedule_command);

    return keyboard.open();
}