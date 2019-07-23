process.env.NTBA_FIX_319 = '1';

import TelegramBot from 'node-telegram-bot-api';
import { start, START_COMMAND } from './handlers/start';
import { User } from './db/entities/User';
import { UserState } from './types/UserState';
import { answerQuestion } from './handlers/answerQuestion';
import { START_QUESTIONS_COMMAND, startQuestions } from './handlers/startQuestions';
import { dummyHandler } from './handlers/dummyHandler';
import { createConnection } from 'typeorm';
import ormconfig = require('./ormconfig');

createConnection(ormconfig)
    .then(() => {
        console.log('Connected to DB. Start bot');
        
        const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});

        bot.on('message', async (msg) => {
            const user = await User.identify(msg);

            if (msg.text === START_COMMAND) {
                return start(bot, user, msg);
            }

            if (msg.text === START_QUESTIONS_COMMAND) {
                return startQuestions(bot, user, msg);
            }

            if (user.state === UserState.Answering) {
                return answerQuestion(bot, user, msg);
            }

            dummyHandler(bot, user, msg);
        });
    })
    .catch(error => console.log(error));