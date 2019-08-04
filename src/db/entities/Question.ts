import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Answer } from "./Answer";

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public text: string;

    @OneToMany((_type) => Answer, answer => answer.question)
    public answers: Answer[];

    public isRightAnswer(answerNumber: string) {
        const sortedAnswers = this.getSortedAnswers();
        const answer = sortedAnswers[Number(answerNumber.replace(/\D/g, '')) - 1];

        return answer && answer.isRight;
    }

    public getSortedAnswers() {
        return this.answers.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }

            if (a.id > b.id) {
                return 1;
            }

            return 0;
        })
    }
}