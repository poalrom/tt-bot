import TelegramBot from 'node-telegram-bot-api';
import { User } from "../db/entities/User";

type IRouterItem = (bot: TelegramBot, user: User, msg: TelegramBot.Message) => Promise<void>;

export type IRouter = Record<string, IRouterItem>;