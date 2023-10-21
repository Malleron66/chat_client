const loginButton = document.getElementById("login_button");
loginButton.addEventListener("click", login);

async function login(){
    const loginUsername = document.getElementById("login_username").value;
    const loginPassword = document.getElementById("login_password").value;

    const dataLogin = {
        userLogin: loginUsername,
        userPassword: loginPassword
    }
    try {
        const res = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dataLogin)
        });

        const dataRes = await res.json();
        if (dataRes.success) {
            // Перенаправление на другую страницу при успешной аутентификации
            window.location.replace('http://127.0.0.1:5500/html/chat.html');
          } else {
            console.error('Ошибка аутентификации');
          }
    }catch (error) {
        console.error('Произошла ошибка: ' + error);
    }
}


