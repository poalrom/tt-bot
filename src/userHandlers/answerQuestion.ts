import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";
import { Texts } from "../texts";
import { Question } from "../db/entities/Question";
import { QuizKeyboard } from "../keyboards/QuizKeyboard";

export async function answerQuestion(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    const currentQuestion = user.currentQuestionId && await Question.findOne(user.currentQuestionId, {
        join: {
            alias: "question",
            leftJoinAndSelect: {
                answers: "question.answers",
            },
        }
    });

    if (currentQuestion) {
        if (msg.text !== Texts.next_question_command) {
            if (currentQuestion.isRightAnswer(msg.text)) {
                user.score++;
                bot.sendMessage(msg.chat.id, Texts.right_answer);
            } else {
                bot.sendMessage(msg.chat.id, Texts.wrong_answer);
            }
        }

        user.addAnsweredId(currentQuestion.id);
    }

    let randomQuestionQuery = Question.getRepository()
        .createQueryBuilder('question')
        .leftJoinAndSelect('question.answers', 'answers')
        .orderBy('RANDOM()');

    if (user.answeredQuestionsIds.length) {
        randomQuestionQuery = randomQuestionQuery.where(`question.id NOT IN (${user.answeredQuestionsIds})`)
    }

    const randomQuestion = await randomQuestionQuery.getOne();

    console.log(randomQuestion);

    if (!randomQuestion) {
        user.currentQuestionId = null;
        await user.save();

        bot.sendMessage(msg.chat.id, Texts.next_question_not_found, QuizKeyboard(user));

        return;
    } else {
        bot.sendMessage(msg.chat.id, Texts.next_question_response);
    }

    user.currentQuestionId = randomQuestion.id;
    await user.save();

    bot.sendMessage(
        msg.chat.id,
        `${randomQuestion.text}\n Ответы: ${randomQuestion.getSortedAnswers().map((answer, i) => `${i+1}: ${answer.text}`).join(`\n`)}`,
        QuizKeyboard(user, randomQuestion.answers)
    );
}