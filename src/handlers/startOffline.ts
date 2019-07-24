import TelegramBot from 'node-telegram-bot-api';
import { User } from '../db/entities/User';
import { UserState } from '../types/UserState';
import { Texts } from '../texts';
import { QuizKeyboard } from '../keyboards/QuizKeyboard';

export async function startOffline(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    if (user.state !== UserState.Finished) {
        user.state = UserState.AnsweringOnline;
        await user.save();

        bot.sendMessage(msg.chat.id, Texts.start_offline_message, QuizKeyboard(user));
    } else {
        bot.sendMessage(msg.chat.id, Texts.finished_quiz_message);
    }
}