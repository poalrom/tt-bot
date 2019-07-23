import TelegramBot from 'node-telegram-bot-api';
import { User } from '../db/entities/User';
import { UserState } from '../types/UserState';

export const START_QUESTIONS_COMMAND = 'Начинаем викторину';

export async function startQuestions(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    user.state = UserState.Answering;

    await user.save();

    bot.sendMessage(msg.chat.id, 'Начинаем викторину');
}