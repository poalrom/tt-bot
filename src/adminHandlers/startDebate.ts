import { adminBot } from "../adminBot";
import { Admin } from "../db/entities/Admin";
import { Debate } from "../db/entities/Debate";
import { User } from "../db/entities/User";
import { DebateKeyboard } from "../keyboards/DebateKeyboard";
import { Texts } from "../texts";
import { userBot } from "../userBot";
import { AdminCommands } from "./commands";

export async function startDebate(admin: Admin, text: string = "", args?: string) {
    if (!args) {
        await createDebate(admin);
    } else {
        const debateId = text.replace(/\D/g, "");
        await fillDebate(admin, Number(debateId), args);
    }
}

async function createDebate(admin: Admin) {
    const debate = new Debate();

    await debate.save();
    admin.currentCommand = `${AdminCommands.START_DEBATE} ${debate.id}`;
    await fillDebate(admin, debate);
}

async function fillDebate(admin: Admin, debateId: number | Debate, text?: string) {
    const debate = typeof debateId === "number" ?
        await Debate.findOne({ id: debateId }) :
        debateId;

    if (!debate || debate.isActive) {
        admin.currentCommand = "";
        await admin.save();
        adminBot.sendMessage(admin.chatId, `Что-то пошло не так. Не могу найти дебаты #${debateId}`);
        return;
    }

    await admin.save();

    if (!debate.theme) {
        if (text) {
            debate.theme = text;
            await debate.save();

            adminBot.sendMessage(admin.chatId, `Кто будет защищать?`);
            return;
        }

        adminBot.sendMessage(admin.chatId, `Какую тему для дебатов задать?`);

        return;
    }

    if (!debate.defender) {
        debate.defender = text;
        await debate.save();

        adminBot.sendMessage(admin.chatId, `Кто будет оппонентом?`);
        return;
    }

    if (!debate.opponent) {
        debate.opponent = text;
        await debate.save();

        adminBot.sendMessage(admin.chatId, `Итого:
Дебаты на тему "${debate.theme}"\n
Защитник: ${debate.defender}
Оппонент: ${debate.opponent}

Начать дебаты? При отрицательном ответе нужно будет заполнять всё заново.
`);
        return;
    }

    if (!debate.isActive) {
        if (text.toLocaleLowerCase() === "да") {
            debate.isActive = true;
            await debate.save();

            admin.currentCommand = "";
            await admin.save();

            const notifiedUsers = await notifyUsers(debate);
            adminBot.sendMessage(admin.chatId, `Дебаты #${debate.id} начались. Уведомил ${notifiedUsers} пользователей`);
        } else if (text.toLocaleLowerCase() === "нет") {
            await debate.remove();
            admin.currentCommand = "";

            await admin.save();
            adminBot.sendMessage(admin.chatId, `Удалил дебаты #${debateId}`);
        } else {
            adminBot.sendMessage(admin.chatId, `Не понял тебя. Ответь "да" или "нет"`);
        }

        return;
    }
}

async function notifyUsers(debate: Debate) {
    const users = await User.find({ isActive: true });

    let successCounter = 0;

    await Promise.all(users.map(async (user) => {
        try {
            await userBot.sendMessage(
                user.chatId,
                Texts.debate_start_message
                    .replace("{1}", String(debate.id))
                    .replace("{2}", debate.theme)
                    .replace("{3}", debate.defender)
                    .replace("{4}", debate.opponent),
                {
                    ...DebateKeyboard(debate),
                    parse_mode: "Markdown",
                },
            );
            successCounter++;
        } catch (_) { }
    }));

    return successCounter;
}