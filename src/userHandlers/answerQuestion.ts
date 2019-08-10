import { config } from "../config";
import { Question } from "../db/entities/Question";
import { User } from "../db/entities/User";
import { UserKeyboard } from "../keyboards/UserKeyboard";
import { Texts } from "../texts";
import { UserState } from "../types/UserState";
import { userBot } from "../userBot";

export async function answerQuestion(user: User, text: string) {
    const [questionId, answerId] = text.split(" ");
    const answeredQuestions = user.getAnsweredQuestionsIds();

    if (answeredQuestions.includes(questionId)) {
        userBot.sendMessage(user.chatId, Texts.already_answered);

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
        throw Texts.wrong_callback;
    }

    const answer = currentQuestion.answers.find((a) => a.id === Number(answerId.replace(/\D/g, "")));

    if (!answer) {
        throw Texts.wrong_callback;
    }

    user.addAnswer(answer);

    if (answer.isRight) {
        user.score++;
        user.last_answer_timestamp = Date.now();
        userBot.sendMessage(user.chatId, Texts.right_answer);
    } else {
        userBot.sendMessage(user.chatId, Texts.wrong_answer);
    }

    if (user.score >= config.scoreForFinal) {
        user.state = UserState.FinishedOnline;
        userBot.sendMessage(user.chatId, Texts.finished_quiz_message, UserKeyboard(user));
    }

    await User.getRepository().save(user);
}