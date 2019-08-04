import { BaseEntity, Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import TelegramBot from "node-telegram-bot-api";
import { config } from "../../config";

@Entity()
export class Admin extends BaseEntity {
    @PrimaryColumn()
    public chatId: number;

    @Column()
    public login: string;

    @Column({ default: '' })
    public currentCommand: string;

    static async identify(msg: TelegramBot.Message | TelegramBot.CallbackQuery) {
        let admin = await Admin.findOne({
            chatId: msg.from.id,
        });

        if (!admin) {
            if (!config.adminLogins.includes(msg.from.username)) {
                return null;
            }
            admin = new Admin();
            admin.chatId = msg.from.id;
            admin.login = msg.from.username;

            await admin.save();
        }

        return admin;
    }
}