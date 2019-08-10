import TelegramBot from "node-telegram-bot-api";

export function getCallbackCommand(query: TelegramBot.CallbackQuery) {
    const commandMatcher = query.data.match(/^(\/\S+) (.+)/);

    if (!commandMatcher) {
        return;
    }

    const [, command, args] = commandMatcher;

    return { command, args };
}