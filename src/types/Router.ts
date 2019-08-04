import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";
import { Admin } from "../db/entities/Admin";

type IUserRouterItem = (bot: TelegramBot, user: User, msg: TelegramBot.Message) => Promise<void>;
type IAdminRouterItem = (bot: TelegramBot, admin: Admin, msg: TelegramBot.Message) => Promise<void>;
type IAdminCallbackRouterItem = (bot: TelegramBot, admin: Admin, args: string) => Promise<void>;

export type IUserRouter = Record<string, IUserRouterItem>;
export type IAdminRouter = Record<string, IAdminRouterItem>;
export type IAdminCallbackRouter = Record<string, IAdminCallbackRouterItem>;