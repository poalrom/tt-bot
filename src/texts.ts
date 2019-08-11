import { UserState } from "./types/UserState";

export const Texts = {
    // ЭТО МЕНЯТЬ НЕЛЬЗЯ!
    start_command: "/start",
    // Это можно менять

    // Ответ на стартовую команду
    start_command_response: "Привет от BEM бота. Stay BEMed",

    // Надписи на кнопках нижней клавиатуры
    start_online_command: "Начать онлайн викторину",
    schedule_command: "Расписание стенда",
    leaderboard_command: "Leaderboard",
    next_question_command: "Следующий вопрос",
    stand_command: "Я на стенде",

    // Фразы бота
    unknown_command_response: "Прости, я не понимаю тебя. Попробуй снова =)",
    start_online_message: "Начинаем онлайн викторину",
    finished_quiz_message: "Поздравляем, ты прошел онлайн этап. Приходи на стенд за своим призом",
    schedule_message: "Держи расписание",
    leaderboard_command_response: "Ты {1} в списке лидеров. У тебя {2} правильных ответов",
    finite_mode_completed: "Ты закончил онлайн этап",
    finite_mode_not_completed: "До окончания онлайн этапа правильно ответь на {1} вопросов",
    right_answer: "Ответ правильный =)",
    wrong_answer: "Ответ неправильный =(",
    next_question_response: "Держи следующий вопрос",
    next_question_not_found: "Ой, кажется ты ответил на все вопросы. Аймаладец",
    already_answered: "Ты уже отвечал на этот вопрос",
    debate_start_message: `Дебаты #{1} начались
Тема: "{2}"

За: {3}
Против: {4}

Голосуй кнопками под сообщением!`,
    vote_success: "Твой голос принят",

    // Отбивки о завершении этапа
    [`state_to_${UserState.ReceivedOnlineGift}`]: "Ты получил подарок за викторину",
    [`state_to_${UserState.ReceivedOfflineGift}`]: "Ты получил подарок за оффлайн",
    [`state_to_${UserState.ReceivedFinalGift}`]: "Ты получил подарок за финал. Аймаладец",
    [`state_to_${UserState.MovedToOffline}`]: "Ты прошел в оффлайн этап",
    [`state_to_${UserState.MovedToFinal}`]: "Ты прошел в финал. Аймаладец",

    // Ответы на коллбеки, отображаются сверху при нажатии на кнопку клавиатуры под сообщением
    success_callback_answer: "Done!",
    error: "Что-то пошло не так",
};