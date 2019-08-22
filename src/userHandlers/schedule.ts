import { User } from "../db/entities/User";
import { Texts } from "../texts";
import { userBot } from "../userBot";

export async function schedule(user: User) {
    await userBot.sendMessage(user.chatId, Texts.schedule_message);
}