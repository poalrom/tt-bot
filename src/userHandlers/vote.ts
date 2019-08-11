import { config } from "../config";
import { Debate } from "../db/entities/Debate";
import { DebateVote } from "../db/entities/DebateVote";
import { Question } from "../db/entities/Question";
import { User } from "../db/entities/User";
import { UserKeyboard } from "../keyboards/UserKeyboard";
import { Texts } from "../texts";
import { userBot } from "../userBot";

export async function vote(user: User, text: string) {
    const [debateId, voteResult] = text.split(" ");
    const debate = await Debate.findOne({ isActive: true, id: Number(debateId.replace(/\D/g, "")) });

    if (!debate) {
        throw Texts.error;
    }

    const userVote = await DebateVote.findOne({ user, debate });

    if (userVote) {
        userVote.forOpponent = voteResult === "-";

        await userVote.save();
    } else {
        const vote = new DebateVote();

        vote.debate = debate;
        vote.user = user;
        vote.forOpponent = voteResult === "-";

        await vote.save();
    }

    userBot.sendMessage(user.chatId, Texts.vote_success, UserKeyboard(user));
}