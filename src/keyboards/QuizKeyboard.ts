import { ReplyKeyboard } from "node-telegram-keyboard-wrapper";
import { Texts } from "../texts";
import { User } from "../db/entities/User";
import { Answer } from "../db/entities/Answer";

export function QuizKeyboard(user: User, answers?: Answer[]) {
    const keyboard = new ReplyKeyboard();

    if (user.isAnswering) {
        answers && keyboard.addRow(...answers.map((answer, i) => {
            return String(i + 1) + (process.env.DEBUG && answer.isRight ? ' +' : '');
        }));
        keyboard.addRow(Texts.next_question_command);
    }

    keyboard.addRow(Texts.schedule_command);
    keyboard.addRow(Texts.return_command);

    return keyboard.open();
}