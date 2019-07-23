import TelegramBot from 'node-telegram-bot-api';
import { User } from '../db/entities/User';

export function answerQuestion(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    bot.sendMessage(msg.chat.id, 'Answer counted');
}