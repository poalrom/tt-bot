process.env.NTBA_FIX_319 = '1';

import TelegramBot from 'node-telegram-bot-api';
import { start } from './handlers/start';
import { User } from './db/entities/User';
import { UserState } from './types/UserState';
import { answerQuestion } from './handlers/answerQuestion';
import { dummyHandler } from './handlers/dummyHandler';
import { createConnection } from 'typeorm';
import { Texts } from './texts';
import ormconfig from './ormconfig';
import { IRouter } from './types/Router';
import { startOnline } from './handlers/startOnline';
import { startOffline } from './handlers/startOffline';
import { returnHandler } from './handlers/returnHandler';
import { schedule } from './handlers/schedule';

const router: IRouter = {
    [Texts.start_command]: start,
    [Texts.start_online_command]: startOnline,
    [Texts.start_offline_command]: startOffline,
    [Texts.return_command]: returnHandler,
    [Texts.schedule_command]: schedule,
};

createConnection(ormconfig)
    .then(() => {
        console.log('Connected to DB. Start bot');
        
        const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

        bot.on('message', async (msg) => {
            const user = await User.identify(msg);

            if (msg.text in router) {
                return await router[msg.text](bot, user, msg);
            }

            if (user.state === UserState.AnsweringOnline) {
                return await answerQuestion(bot, user, msg);
            }

            await dummyHandler(bot, user, msg);
        });
    })
    .catch(error => console.log(error));