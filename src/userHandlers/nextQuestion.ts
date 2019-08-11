import { Question } from "../db/entities/Question";
import { User } from "../db/entities/User";
import { QuestionKeyboard } from "../keyboards/QuestionKeyboard";
import { UserKeyboard } from "../keyboards/UserKeyboard";
import { Texts } from "../texts";
import { UserState } from "../types/UserState";
import { userBot } from "../userBot";

export async function nextQuestion(user: User, text: string) {
    if (user.state >= UserState.FinishedOnline) {
        userBot.sendMessage(user.chatId, Texts.finished_quiz_message, UserKeyboard(user));

        return;
    }

    const [questionId, answerId] = text.split(" ");
    if (!questionId || !answerId) {
        throw Texts.error;
    }

    let randomQuestionQuery = Question.getRepository()
        .createQueryBuilder("question")
        .leftJoinAndSelect("question.answers", "answers")
        .orderBy("RANDOM()");

    const answeredQuestions = user.getAnsweredQuestionsIds();

    if (answeredQuestions.length > 0) {
        randomQuestionQuery = randomQuestionQuery.where(`question.id NOT IN (${answeredQuestions.join(",")})`);
    }

    const randomQuestion = await randomQuestionQuery.getOne();

    if (!randomQuestion) {
        await user.save();

        userBot.sendMessage(user.chatId, Texts.next_question_not_found, UserKeyboard(user));

        return;
    }

    userBot.sendMessage(user.chatId, Texts.next_question_response);
    await user.save();

    const answers = randomQuestion.getRandomSortedAnswers();

    userBot.sendMessage(
        user.chatId,
        `${randomQuestion.text}\n\nОтветы:\n${answers.map((answer, i) => `*${i + 1}*: ${answer.text}`).join(`\n`)}`,
        {
            ...QuestionKeyboard(answers),
            parse_mode: "Markdown",
        }
    );
}