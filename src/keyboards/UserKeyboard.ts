import { ReplyKeyboard } from "node-telegram-keyboard-wrapper";
import { User } from "../db/entities/User";
import { Texts } from "../texts";
import { UserState } from "../types/UserState";

export function UserKeyboard(user: User) {
    const keyboard = new ReplyKeyboard();

    if (user.state === UserState.Initial) {
        keyboard.addRow(Texts.start_online_command);
    }
    if (user.state === UserState.AnsweringOnline) {
        keyboard.addRow(Texts.next_question_command);
    }
    if (user.state === UserState.FinishedOnline) {
        keyboard.addRow(Texts.stand_command);
    }

    keyboard.addRow(Texts.leaderboard_command);
    keyboard.addRow(Texts.schedule_command);

    return keyboard.open();
}