import { text_message_id, has_images, create_sms_block, button_send_id } from "./create_message.js";

/**
 * Проверки на пустоту, наличие картинок перед отправкой
 * */
const form_message = () => {
    const message = text_message_id.value.trim();
    
    if ((has_images() && message !== '') || has_images() || message !== '') {
        //Получаем дату в момент отправки смс
        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();

        // Если часы и минуты меньше 10, добавляем впереди нули
        const formattedHours = hours < 10 ? "0" + hours : hours;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedTime = formattedHours + ":" + formattedMinutes;
        
        const data = {
            userId: 777,
            message: message,
            dataTime: formattedTime
        };
        
        const dataTime = data.dataTime;
        const userId = data.userId;
        create_sms_block({message, userId, dataTime});
        text_message_id.value = "";

        fetch("http://localhost:3000/chat",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        )
        .then(response => response.json())
        .then(result => {
            console.log('Сервер ответил:', result);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    }
}
/**
 * Отправляем по нажатию Enter или клику по кнопке
 * */
const send_massage = () => {
    text_message_id.addEventListener("keydown", (event) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            form_message();
        }
    });
    button_send_id.addEventListener("click", function() {
        form_message();
    });
}
export default send_massage;