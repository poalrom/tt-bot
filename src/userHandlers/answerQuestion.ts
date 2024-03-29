import { config } from "../config";
import { Question } from "../db/entities/Question";
import { User } from "../db/entities/User";
import { UserKeyboard } from "../keyboards/UserKeyboard";
import { Texts } from "../texts";
import { UserState } from "../types/UserState";
import { userBot } from "../userBot";
import { nextQuestion } from "./nextQuestion";

export async function answerQuestion(user: User, text: string) {
    const [questionId, answerId] = text.split(" ");
    const answeredQuestions = user.getAnsweredQuestionsIds();

    if (answeredQuestions.includes(questionId)) {
        await userBot.sendMessage(user.chatId, Texts.already_answered);

        return;
    }

    const currentQuestion = questionId && await Question.findOne(questionId, {
        join: {
            alias: "question",
            leftJoinAndSelect: {
                answers: "question.answers",
            },
        }
    });

    if (!currentQuestion) {
        throw Texts.error;
    }

    const answer = currentQuestion.answers.find((a) => a.id === Number(answerId.replace(/\D/g, "")));

    if (!answer) {
        throw Texts.error;
    }

    user.addAnswer(answer);

    if (answer.isRight) {
        user.score++;
        user.last_answer_timestamp = Date.now();
        await userBot.sendMessage(user.chatId, Texts.right_answer);
    } else {
        await userBot.sendMessage(user.chatId, Texts.wrong_answer);
    }

    if (user.score >= config.scoreForFinal) {
        user.state = UserState.FinishedOnline;
        await userBot.sendMessage(user.chatId, Texts.finished_quiz_message, UserKeyboard(user));
    } else {
        await nextQuestion(user);
    }

    await User.getRepository().save(user);
}