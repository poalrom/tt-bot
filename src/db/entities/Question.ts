import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Answer } from "./Answer";

@Entity()
export class Question extends BaseEntity {
    @PrimaryColumn()
    public id: number;

    @Column()
    public text: string;

    @OneToMany((_type) => Answer, answer => answer.question)
    public answers: Answer[];
}