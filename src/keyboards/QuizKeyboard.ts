import { ReplyKeyboard } from "node-telegram-keyboard-wrapper";
import { Texts } from "../texts";
import { User } from "../db/entities/User";
import { UserState } from "../types/UserState";
import { Answer } from "../db/entities/Answer";

export function QuizKeyboard(user: User, answers?: Answer[]) {
    const keyboard = new ReplyKeyboard();

    if (user.isAnswering) {
        if (user.state === UserState.AnsweringOffline) {
            keyboard.addRow(Texts.switch_to_online_command);
        } else {
            answers && keyboard.addRow(...answers.map((_, i) => String(i + 1)));
            keyboard.addRow(Texts.next_question_command);
            keyboard.addRow(Texts.switch_to_offline_command);
        }
    }

    keyboard.addRow(Texts.schedule_command);
    keyboard.addRow(Texts.return_command);

    return keyboard.open();
}