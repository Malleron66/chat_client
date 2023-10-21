const content = document.getElementById("content");
const url = window.location.pathname;
console.log(url);
if(url === "/"){
    fetch('./html/home.html')
  .then(response => response.text())
  .then(data => {
    // Обработайте содержимое HTML-файла в переменной 'data'
    // Например, вставьте его в какой-то элемент на странице
    content.innerHTML = data;
  })
  .catch(error => console.error('Ошибка:', error));
    
}
if(url === "/chat"){
    console.log('fgdfdfdf');
    fetch('./html/chat.html')
  .then(response => response.text())
  .then(data => {
    // Обработайте содержимое HTML-файла в переменной 'data'
    // Например, вставьте его в какой-то элемент на странице
    content.innerHTML = data;
  })
  .catch(error => console.error('Ошибка:', error));
    
}