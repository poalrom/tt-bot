import { Debate } from "../db/entities/Debate";
import { User } from "../db/entities/User";
import { DebateKeyboard } from "../keyboards/DebateKeyboard";
import { UserKeyboard } from "../keyboards/UserKeyboard";
import { logger } from "../logger";
import { Texts } from "../texts";
import { userBot } from "../userBot";

export async function start(user: User) {
    logger.info(`start: Start session for ${user.login}`);

    await user.resetState();

    await userBot.sendMessage(user.chatId, Texts.start_command_response, UserKeyboard(user));

    const activeDebate = await Debate.findOne({ isActive: true });

    if (activeDebate) {
        await userBot.sendMessage(
            user.chatId,
            Texts.has_active_debate
        );
        await userBot.sendMessage(
            user.chatId,
            Texts.debate_start_message
                .replace("{1}", String(activeDebate.id))
                .replace("{2}", activeDebate.theme)
                .replace("{3}", activeDebate.defender)
                .replace("{4}", activeDebate.opponent),
            {
                ...DebateKeyboard(activeDebate),
                parse_mode: "Markdown",
            },
        );
    }
}