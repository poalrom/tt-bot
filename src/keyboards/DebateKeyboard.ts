import { InlineKeyboard } from "node-telegram-keyboard-wrapper";
import { Commands } from "../commands";
import { Debate } from "../db/entities/Debate";

export function DebateKeyboard(debate: Debate) {
    const keyboard = new InlineKeyboard();

    keyboard.addRow({
        text: `За: ${debate.defender}`,
        callback_data: `${Commands.debate_vote_command} ${debate.id} +`
    });

    keyboard.addRow({
        text: `Против: ${debate.opponent}`,
        callback_data: `${Commands.debate_vote_command} ${debate.id} -`
    });

    return keyboard.build();
}