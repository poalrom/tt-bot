import { adminBot } from "../adminBot";
import { Admin } from "../db/entities/Admin";
import { User } from "../db/entities/User";
import { AdminUserKeyboard } from "../keyboards/AdminUserKeyboard";

interface ISendCacheItem {
    userId: number;
    timestamp: number;
}

const sendCache = [] as ISendCacheItem[];

export async function onStandHandler(user: User) {
    const cachedSend = sendCache.find((item) => item.userId === user.chatId);

    if (!cachedSend) {
        sendCache.push({
            userId: user.chatId,
            timestamp: Date.now()
        });
    } else if (cachedSend.timestamp >= (Date.now() - 10000)) {
        return;
    } else {
        cachedSend.timestamp = Date.now();
    }

    const admins = await Admin.find();

    await Promise.all(admins.map(async (admin) => {
        return adminBot.sendMessage(
            admin.chatId,
            `${user.firstName} ${user.lastName}(@${user.login}) пришел на стенд.`,
            AdminUserKeyboard(admin, user)
        );
    }));
}