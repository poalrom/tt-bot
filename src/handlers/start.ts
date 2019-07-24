import TelegramBot from 'node-telegram-bot-api';
import { StartKeyboard } from '../keyboards/StartKeyboard';
import { User } from '../db/entities/User';

export async function start(bot: TelegramBot, user: User, msg: TelegramBot.Message) {
    bot.sendMessage(msg.chat.id, 'Start', StartKeyboard(user));
}