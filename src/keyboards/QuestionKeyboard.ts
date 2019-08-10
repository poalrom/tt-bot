import { InlineKeyboardButton } from "node-telegram-bot-api";
import { InlineKeyboard } from "node-telegram-keyboard-wrapper";
import { Commands } from "../commands";
import { Answer } from "../db/entities/Answer";

export function QuestionKeyboard(answers: Answer[]) {
    const keyboard = new InlineKeyboard();

    answers.reduce((acc, answer, i) => {
        acc.push(
            {
                text: `${i + 1}${process.env.DEBUG && answer.isRight ? " +" : ""}`,
                callback_data: `${Commands.answer_question_command} ${answer.questionId} ${answer.id}`
            }
        );

        if (acc.length === 2 || i === (answers.length - 1)) {
            keyboard.addRow(...acc);

            return [];
        }

        return acc;
    }, [] as InlineKeyboardButton[]);

    return keyboard.build();
}