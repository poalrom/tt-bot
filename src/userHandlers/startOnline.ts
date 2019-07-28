import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";
import { UserState } from "../types/UserState";
import { Texts } from "../texts";
import { QuizKeyboard } from "../keyboards/QuizKeyboard";
import { answerQuestion } from "./answerQuestion";

export async function startOnline(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    if (user.state !== UserState.Finished) {
        user.currentQuestionId = null;
        user.state = UserState.AnsweringOnline;
        await user.save();

        bot.sendMessage(msg.chat.id, Texts.start_online_message, QuizKeyboard(user));

        await answerQuestion(bot, user, msg);
    } else {
        bot.sendMessage(msg.chat.id, Texts.finished_quiz_message);
    }
}