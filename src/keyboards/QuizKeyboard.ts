import { ReplyKeyboard } from 'node-telegram-keyboard-wrapper';
import { Texts } from '../texts';
import { User } from '../db/entities/User';
import { UserState } from '../types/UserState';

export function QuizKeyboard(user: User) {
    const keyboard = new ReplyKeyboard();

    keyboard.addRow(Texts.return_command);
    if (user.isAnswering) {
        if (user.state === UserState.AnsweringOffline) {
            keyboard.addRow(Texts.switch_to_online_command);
        } else {
            keyboard.addRow(Texts.switch_to_offline_command);
        }
    }
    keyboard.addRow(Texts.schedule_command);

    return keyboard.open()
}