import { readFileSync } from "fs";
import { load } from "js-yaml";

import { initDB } from "../db";
import { Answer } from "../db/entities/Answer";
import { Question } from "../db/entities/Question";

interface IQuestion {
    question: string;
    answers: string[];
    code?: string;
}

export async function addQuestions() {
    await initDB();

    const questions = load(readFileSync("./questions/questions.yml", "utf-8"));

    await Promise.all(questions.map(async (questionData: IQuestion) => {
        const question = new Question();
        question.text = questionData.question;

        if (questionData.code) {
            question.text += "```" + questionData.code + "```";
        }

        await question.save();

        console.log(`Add question ${question.id}`);

        await Promise.all(questionData.answers.map(async (answerData, i) => {
            const answer = new Answer();
            answer.questionId = question.id;
            answer.text = answerData;
            answer.isRight = i === 0;

            await answer.save();

            console.log(`Add answer ${i} for question ${question.id}`);
        }));
    }));
}