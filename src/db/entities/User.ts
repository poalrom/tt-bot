import { BaseEntity, Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import TelegramBot from "node-telegram-bot-api";
import { UserState } from "../../types/UserState";
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

    @Column({ nullable: true })
    public currentQuestionId: number;

    @OneToOne((_type) => Question)
    @JoinColumn({ name: "currentQuestionId" })
    public currentQuestion: Question;

    @Column({ type: 'bigint' })
    public last_answer_timestamp: number;

    /**
     * Строка со списком ID вопросов, на которые уже ответил пользователь
     * Разделитель - ","
     */
    @Column({ default: "" })
    public answeredQuestionsIds: string;

    @Column({ default: true })
    public isActive: boolean;

    public get isAnswering() {
        return UserState.AnsweringOnline === this.state;
    }

    public addAnsweredId(id: number) {
        if (this.answeredQuestionsIds.length) {
            this.answeredQuestionsIds += `,${id}`;
        } else {
            this.answeredQuestionsIds = String(id);
        }
    }

    public async resetState() {
        if (this.isAnswering) {
            this.state = UserState.Initial;
            await this.save();
        }
    }

    static async identify(msg: TelegramBot.Message) {
        let user = await User.findOne({
            chatId: msg.chat.id,
        });

        if (!user) {
            user = new User();
            user.chatId = msg.chat.id;
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