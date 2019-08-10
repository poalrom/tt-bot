import TelegramBot from "node-telegram-bot-api";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { UserState } from "../../types/UserState";
import { Answer } from "./Answer";
import { Question } from "./Question";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
    public chatId: number;

    @Column()
    public login: string;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column({ default: UserState.Initial })
    public state: UserState;

    @Column({ default: 0 })
    score: number;

    @ManyToMany((_type) => Answer, answer => answer.users)
    @JoinTable({ name: "user_answers" })
    public answers: Answer[];

    @Column({ type: "bigint" })
    public last_answer_timestamp: number;

    public getAnsweredQuestionsIds() {
        if (!this.answers) {
            return [];
        }

        return this.answers.reduce((acc, answer) => {
            acc.push(String(answer.questionId));

            return acc;
        }, [] as string[]);
    }

    @Column({ default: true })
    public isActive: boolean;

    public addAnswer(answer: Answer) {
        if (this.answers) {
            this.answers.push(answer);
        } else {
            this.answers = [answer];
        }
    }

    public get isAnswering() {
        return UserState.AnsweringOnline === this.state;
    }

    public async resetState() {
        if (this.isAnswering) {
            this.state = UserState.Initial;
            await this.save();
        }
    }

    static async identify(msg: TelegramBot.Message | TelegramBot.CallbackQuery) {
        let user = await User.findOne({
            chatId: msg.from.id,
        }, {
            relations: ["answers"],
        });

        if (!user) {
            user = new User();
            user.chatId = msg.from.id;
            user.login = msg.from.username;
            user.firstName = msg.from.first_name;
            user.lastName = msg.from.last_name;
            user.last_answer_timestamp = Date.now();

            await user.save();
        } else if (!user.isActive) {
            user.isActive = true;

            await user.save();
        }

        return user;
    }
}