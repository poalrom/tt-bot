import { Admin } from "../db/entities/Admin";
import { User } from "../db/entities/User";
import { UserKeyboard } from "../keyboards/UserKeyboard";
import { Texts } from "../texts";
import { userBot } from "../userBot";

export async function changeUserState(admin: Admin, text: string) {
    const [userId, state] = text.split(" ");
    const user = await User.findOne({ chatId: Number(userId) });

    if (!user) {
        throw `User with id ${user.chatId} was not found`;
    }

    user.state = Number(state);
    await user.save();

    userBot.sendMessage(user.chatId, Texts[`state_to_${state}`], UserKeyboard(user));
}