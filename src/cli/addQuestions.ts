import { initDB } from "../db";
import { Question } from "../db/entities/Question";
import { Answer } from "../db/entities/Answer";

export async function addQuestions() {
    await initDB();

    for (let i = 0; i < 100; i++) {
        const question = new Question();
        question.text = `Вопрос ${i}`;

        await question.save();

        const answers: Answer[] = [];

        for (let i = 0; i < 4; i++) {
            const answer = new Answer();
            answer.questionId = question.id;
            answer.text = String(i);
            answers.push(answer);
        }

        const rightAnswerIndex = Math.floor(Math.random() * 4);
        answers[rightAnswerIndex].isRight = true;

        await Promise.all(answers.map(async a => await a.save()));

        console.log(`Add question ${i}`)
    }
}