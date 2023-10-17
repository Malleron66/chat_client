let int = 0;
export const button_send_id = document.getElementById("button_send_id");
const smsContainer = document.querySelector(".w-sms");
export const text_message_id = document.getElementById("text_message_id");
/**
 * Проверка на наличии прикрепленных картинок к сообщению
 * */
export const has_images = () => {
    const checking_to_add_images = document.querySelectorAll('.image_preview_container');
    return checking_to_add_images.length > 0;
};
/**
 * Создаем блок для времени
 * */
const create_div_dataTime = (dataTime) => {
    const divWrapTime = document.createElement("div");
    divWrapTime.className = "w-time-sms";
    divWrapTime.textContent = dataTime;
    return divWrapTime;
};
/**
 * Создаем тело смс
 * */
const create_sms_text = ({ message, userId}) => {
    const smsText = document.createElement("div");
    if(userId === 777){
        smsText.className = "sms-text sent";
    }else if(userId === 888){
        smsText.className = "sms-text received";
    }
    smsText.id = "click_sms_" + int;

    const smsText_span = document.createElement("span");
    smsText_span.className = "text-content";
    if (has_images()) {
        const checking_to_add_images = document.querySelectorAll('.image_preview_container');
        for (let i = 0; i < checking_to_add_images.length; i++) {
            const img_id = document.getElementById("image_to_add_id_" + i);
            const img_add = document.createElement("img");
            img_add.className = "sms_img";
            img_add.src = img_id.getAttribute('src');
            smsText_span.appendChild(img_add);
        }
        del_block_to_add_img();
    }

    const text_content_span = document.createElement("span");
    text_content_span.className = "text_content_span";
    text_content_span.textContent = message;

    const { editext_message_id } = create_edit_box();

    smsText_span.appendChild(text_content_span);
    smsText_span.appendChild(editext_message_id);
    return { smsText, smsText_span };
};
/**
 * Создаем скрытый инпут для редактирования смс
 * */
const create_edit_box = () => {
    const editext_message_id = document.createElement("input");
    editext_message_id.type = "text";
    editext_message_id.className = "edit-input";
    editext_message_id.style.display = "none";
    return { editext_message_id };
};
/**
 * Создаем обертку для кнопок редактирования смс
 * */
const create_wrapper_redact_buttons = () => {
    const wIcon = document.createElement("div");
    wIcon.className = "wrapper w_icon";
    return { wIcon };
};
/**
 * Создаем кнопку редактирования смс
 * */
const create_redact_button = ({ class_name, img_src, title }) => {
    const span = document.createElement("span");
    span.className = class_name;
    span.title = title;
    const imgElement = document.createElement("img");
    imgElement.src = img_src;
    span.appendChild(imgElement);
    return { span };
};
/**
 * Открытие-сокрытия панели настройки смс
 * */
const open_hide_block = () => {
    const open_hide = document.getElementById("click_sms_" + int);
    open_hide.addEventListener("click", () => {
        open_hide.classList.toggle("block");
    });
};
/**
 * Редактирование смс по кнопке
 * */
const edit_button = () => {
    const sms_edit = document.getElementById("click_sms_" + int);
    const textContentElement = sms_edit.querySelector(".text_content_span");
    const editext_message_idElement = sms_edit.querySelector(".edit-input");
    const editButton = sms_edit.querySelector(".edit-button");

    // Обработчик события для кнопки "Редактировать"
    editButton.addEventListener("click", () => {
        // Переключаем видимость элементов для редактирования
        textContentElement.style.display = "none";
        editext_message_idElement.style.display = "inline-block";

        // Устанавливаем текущий текст в поле для редактирования
        editext_message_idElement.value = textContentElement.textContent;

        // Фокусируемся на поле для редактирования
        editext_message_idElement.focus();
    });

    // Обработчик события при потере фокуса на поле для редактирования
    editext_message_idElement.addEventListener("blur", () => {
        // Переключаем видимость элементов обратно
        textContentElement.style.display = "inline-block";
        editext_message_idElement.style.display = "none";

        // Обновляем текст с учетом изменений и проверкой на пустоту
        if (editext_message_idElement.value.trim() !== '') {
            textContentElement.textContent = editext_message_idElement.value;
        } else {
            textContentElement.textContent = textContentElement.textContent;
        }

    });
};
/**
 * Кнопка удаление сообщения
 * */
const delete_sms_button = ({ smsText }) => {
    const delSms = document.getElementById("click_sms_" + int);
    const delSmsButton = delSms.querySelector(".del_sms");
    delSmsButton.addEventListener("click", () => {
        smsText.remove();
    });
};
/**
 * Удаляем блок прелоадера картинок
 * */
const del_block_to_add_img = () => {
    const wrapper_image_add = document.getElementById('wrapper_image_add');
    while (wrapper_image_add.firstChild) {
        wrapper_image_add.removeChild(wrapper_image_add.firstChild);
    }
    wrapper_image_add.style.display = "none";
};
/**
 * Собираем и отправляем смс
 * */
export const create_sms_block = ({ message, userId, dataTime}) => {
    const timeDiv = create_div_dataTime(dataTime);
    const { smsText, smsText_span } = create_sms_text({ message, userId });
    smsText.appendChild(smsText_span);

    const { span: span1 } = create_redact_button({ class_name: "edit-button", img_src: "img/redact.png", title: "Editing" });
    const { span: span2 } = create_redact_button({ class_name: "del_sms", img_src: "img/del.png", title: "Delete" });

    const { wIcon } = create_wrapper_redact_buttons();
    wIcon.appendChild(span1);
    wIcon.appendChild(span2);
    smsText.appendChild(wIcon);
    smsText.appendChild(timeDiv);
    smsContainer.appendChild(smsText);

    open_hide_block();
    edit_button();
    delete_sms_button({ smsText });
    smsContainer.scrollTop = smsContainer.scrollHeight;
    int++;
};
