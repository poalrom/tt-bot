import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class Answer extends BaseEntity {
    @PrimaryColumn()
    public id: number;

    @Column()
    public text: string;

    @Column({ default: false })
    public isRight: boolean;

    @Column()
    public questionId: number;

    @ManyToOne((_type) => Question)
    @JoinColumn({ name: "questionId" })
    public question: Question;
}