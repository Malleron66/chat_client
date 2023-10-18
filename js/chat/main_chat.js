<<<<<<< HEAD:js/chat/main_chat.js
import { create_sms_block } from "./create_message.js";
import send_massage from "./send_massage.js";
import load_img from "./load_img.js";
=======
import { create_sms_block } from "./chat/create_message.js";
import send_massage from "./chat/send_massage.js";
import load_img from "./chat/load_img.js";
>>>>>>> 81382536e0e0a5b121353c3900bb3b4e5c45ef0e:js/main.js

//Запрос на сервер для получения истории сообщений
window.addEventListener('DOMContentLoaded', async (event) => {
    try {
        const response = await fetch('http://localhost:3000/', {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        const dataString = await response.json();

        // Проверка, является ли строка корректным JSON
        try {
            const jsonData = JSON.parse(dataString);
            jsonData.forEach(item => {
                let userId = item.userId;
                let message = item.message;
                let dataTime = item.dataTime;                 
                create_sms_block({message, userId, dataTime});
            });
        } catch (error) {
            console.error('Ошибка парсинга JSON:', error);
        }
    } catch (error) {
        console.error('Произошла ошибка: ' + error);
    }
});

// Отправка сообщения
send_massage();

// Добавляем обработчик события на клик по кнопке "Load img"
const loader_img_button = document.getElementById("loader_img_button");
loader_img_button.addEventListener("click", load_img);
