import { User } from "../db/entities/User";
import { UserKeyboard } from "../keyboards/UserKeyboard";
import { logger } from "../logger";
import { Texts } from "../texts";
import { userBot } from "../userBot";

export async function start(user: User) {
    logger.info(`start: Start session for ${user.login}`);

    await user.resetState();

    userBot.sendMessage(user.chatId, Texts.start_command_response, UserKeyboard(user));
}