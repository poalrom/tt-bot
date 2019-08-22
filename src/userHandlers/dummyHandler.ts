import { User } from "../db/entities/User";
import { Texts } from "../texts";
import { userBot } from "../userBot";

export async function dummyHandler(user: User) {
    await userBot.sendMessage(user.chatId, Texts.unknown_command_response);
}