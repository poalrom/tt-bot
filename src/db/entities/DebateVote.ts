import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Debate } from "./Debate";
import { User } from "./User";

@Entity()
export class DebateVote extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne((_type) => User, user => user.votes)
    public user: User;

    @ManyToOne((_type) => Debate, debate => debate.votes)
    public debate: Debate;

    @Column()
    public forOpponent: boolean;
}