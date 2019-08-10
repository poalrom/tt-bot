import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { shuffle } from "../../utils/shuffle";
import { Answer } from "./Answer";

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public text: string;

    @OneToMany((_type) => Answer, answer => answer.question)
    public answers: Answer[];

    public isRightAnswer(answerId: string) {
        const answer = this.answers.find((a) => a.id === Number(answerId.replace(/\D/g, "")));

        return answer && answer.isRight;
    }

    public getRandomSortedAnswers() {
        return shuffle(this.answers);
    }
}