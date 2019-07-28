import TelegramBot from "node-telegram-bot-api";
import { User } from "../db/entities/User";

export function announce(bot: TelegramBot) {
    const users = User.find({ isActive: true });
}