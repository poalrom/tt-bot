import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class Answer extends BaseEntity {
    @PrimaryGeneratedColumn()
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