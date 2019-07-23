import TelegramBot from 'node-telegram-bot-api';
import { User } from '../db/entities/User';

export function dummyHandler(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    bot.sendMessage(msg.chat.id, 'Прости, я не понимаю тебя. Попробуй снова =)');
}