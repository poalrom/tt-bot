import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DebateVote } from "./DebateVote";
import { Question } from "./Question";

@Entity()
export class Debate extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ default: "" })
    public theme: string;

    @Column({ default: "" })
    public defender: string;

    @Column({ default: "" })
    public opponent: string;

    @OneToMany((_type) => DebateVote, dv => dv.debate)
    public votes: Debate[];

    @Column({ default: false })
    public isActive: boolean;
}