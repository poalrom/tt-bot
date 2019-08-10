import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question";
import { User } from "./User";

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

    @ManyToMany((_type) => User, user => user.answers)
    public users: User[];
}