document.addEventListener('DOMContentLoaded', (event) => {
    // Получаем список пользователей из localStorage или создаем пустой массив
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Функция для регистрации нового пользователя
    function registerUser(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        // Получаем элементы формы
        let usernameInput = document.getElementById('loginUsername');
        let passwordInput = document.getElementById('loginPassword');

        // Проверяем, существуют ли элементы формы
        if (!usernameInput || !passwordInput) {
            console.error('Не удалось найти элементы формы регистрации.');
            return;
        }

        // Получаем значения из полей формы
        let username = usernameInput.value;
        let password = passwordInput.value;
        let role = 'user'; // Устанавливаем роль по умолчанию

        // Проверяем, существует ли уже пользователь с таким именем
        if (users.some(user => user.username === username)) {
            alert('Пользователь с таким именем уже существует!');
            return;
        }

        // Создаем нового пользователя
        let newUser = { username, password, role };
        users.push(newUser); // Добавляем нового пользователя в массив
        alert('Пользователь успешно зарегистрирован!');

        // Сохраняем обновленный список пользователей в localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Перенаправляем пользователя на главную страницу
        window.location.href = 'index.html';
    }

    // Получаем форму регистрации
    let loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Добавляем обработчик события submit для формы регистрации
        loginForm.addEventListener('submit', registerUser);
    } else {
        console.error('Не удалось найти форму регистрации.');
    }
});