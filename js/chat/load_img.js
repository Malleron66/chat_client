const input_img_button = document.getElementById("input_img_button");
const wrapper_image_add = document.getElementById("wrapper_image_add");

function preloader() {
    input_img_button.addEventListener("change", () => {

        const selected_images = input_img_button.files;

        // Очищаем контейнер с предварительным просмотром
        wrapper_image_add.innerHTML = '';

        wrapper_image_add.style.display = "flex";
        // Перебираем выбранные изображения и отображаем их
        for (let i = 0; i < selected_images.length; i++) {
            const div = document.createElement('div');
            div.className = "image_preview_container";

            const span_img = document.createElement('span');
            const img_to_add = document.createElement('img');
            img_to_add.src = "./img/to_add.png";
            img_to_add.className = "to_add_img_icon";
            span_img.appendChild(img_to_add);
            div.appendChild(span_img);

            const image = document.createElement('img');
            image.id = "image_to_add_id_" + i;
            image.className = "img_add";
            image.src = URL.createObjectURL(selected_images[i]);

            div.appendChild(image);

            wrapper_image_add.appendChild(div);
        }
    });
}

const load_img = () =>{
    input_img_button.click();
    preloader();
}

export default load_img;
