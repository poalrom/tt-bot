import { User } from "../db/entities/User";
import { UserKeyboard } from "../keyboards/UserKeyboard";
import { Texts } from "../texts";
import { UserState } from "../types/UserState";
import { userBot } from "../userBot";
import { nextQuestion } from "./nextQuestion";

export async function startOnline(user: User) {
    if (user.state < UserState.FinishedOnline) {
        user.state = UserState.AnsweringOnline;
        await user.save();
        await userBot.sendMessage(user.chatId, Texts.start_online_message, UserKeyboard(user));
        await nextQuestion(user);
    } else {
        await userBot.sendMessage(user.chatId, Texts.finished_quiz_message, UserKeyboard(user));
    }
}