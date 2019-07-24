import TelegramBot from 'node-telegram-bot-api';
import { User } from '../db/entities/User';
import { Texts } from '../texts';
import { StartKeyboard } from '../keyboards/StartKeyboard';
import { UserState } from '../types/UserState';

export async function returnHandler(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    if ([UserState.AnsweringOnline, UserState.AnsweringOffline].includes(user.state)) {
        user.state = UserState.Initial;
        await user.save();
        bot.sendMessage(msg.chat.id, Texts.return_message, StartKeyboard(user));
    } else {
        bot.sendMessage(msg.chat.id, Texts.can_not_return_message, StartKeyboard(user));
    }
}