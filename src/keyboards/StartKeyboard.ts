import { ReplyKeyboard } from 'node-telegram-keyboard-wrapper';
import { START_QUESTIONS_COMMAND } from '../handlers/startQuestions';

export const StartKeyboard = new ReplyKeyboard();

StartKeyboard.addRow(
    START_QUESTIONS_COMMAND,
    'Онлайн вопросы',
);