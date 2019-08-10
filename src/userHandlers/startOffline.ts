import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";
import { UserState } from "../types/UserState";
import { Texts } from "../texts";
import { logger } from "../logger";
import { StartKeyboard } from "../keyboards/StartKeyboard";
import { Admin } from "../db/entities/Admin";
import { adminBot } from "../adminBot";
import { AdminUserKeyboard } from "../keyboards/AdminUserKeyboard";

export async function startOffline(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    if (user.state !== UserState.Finished) {
        logger.info(`startOffline: Start offline quiz for ${user.login}`, msg);

        const admins = await Admin.find();

        await Promise.all(admins.map(async (admin) => {
            return adminBot.sendMessage(
                admin.chatId,
                `${user.firstName} ${user.lastName}(@${user.login}) пришел на стенд решать задачки`,
                AdminUserKeyboard(admin, user)
            );
        }));

        bot.sendMessage(msg.chat.id, Texts.start_offline_message, StartKeyboard(user));
    } else {
        bot.sendMessage(msg.chat.id, Texts.finished_quiz_message);
    }
}