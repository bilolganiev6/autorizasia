document.addEventListener('DOMContentLoaded', (event) => {
    // Простая база данных пользователей с предварительно заполненными данными администратора и пользователя
    let users = [
        { username: 'Билол', password: 'билол123', role: 'admin' },
        { username: 'Макс', password: 'макс123', role: 'user' },
        { username: 'Мирик', password: 'мирик123', role: 'user' },
    ];

    // Функция для обработки регистрации
    function registerUser(event) {
        event.preventDefault(); // Предотвращает отправку формы

        let username = document.getElementById('registerUsername').value; // Получаем имя пользователя из формы
        let password = document.getElementById('registerPassword').value; // Получаем пароль пользователя из формы
        let role = 'user'; // Роль по умолчанию для регистрации

        // Проверяем, существует ли пользователь уже сейчас
        if (users.some(user => user.username === username)) {
            alert('User already exists!'); // Выводим сообщение, если пользователь уже существует
            return;
        }

        // Добавляем нового пользователя
        users.push({ username, password, role });
        alert('Пользователь успешно зарегистрировался!'); // Выводим сообщение об успешной регистрации
    }

    // Функция для обработки входа в систему
    function loginUser(event) {
        event.preventDefault(); // Предотвращает отправку формы

        let username = document.getElementById('loginUsername').value; // Получаем имя пользователя из формы
        let password = document.getElementById('loginPassword').value; // Получаем пароль пользователя из формы

        // Приводим логин к нижнему регистру
        username = username.toLowerCase();

        // Ищем пользователя
        let user = users.find(user => user.username.toLowerCase() === username && user.password === password);

        if (user) {
            // Сохраняем информацию о пользователе в localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            document.getElementById('authMessage').textContent = `Добро пожаловать, ${user.username}. Ваша роль ${user.role}.`; // Выводим сообщение о успешном входе
            showContentBasedOnRole(user.role); // Отображаем контент в зависимости от роли пользователя
            // Проверяем роль пользователя и выполняем перенаправление
            if (user.role === 'user') {
                // Перенаправляем пользователя на user.html
                window.location.href = 'user.html';
            } else if (user.role === 'admin') {
                // Перенаправляем администратора на admin.html
                window.location.href = 'admin.html';
            }
        } else {
            document.getElementById('authMessage').textContent = 'Неверное имя пользователя или пароль!'; // Выводим сообщение об ошибке
        }
    }

    // Функция для выхода из системы
    function logoutUser() {
        // Удаляем информацию о пользователе из localStorage
        localStorage.removeItem('currentUser');
        // Перенаправляем пользователя на страницу входа
        window.location.href = 'login.html';
    }

    // Функция отображения контента в зависимости от роли пользователя
    function showContentBasedOnRole(role) {
        let adminContent = document.getElementById('adminContent');
        let userContent = document.getElementById('userContent');

        if (adminContent && role === 'admin') {
            adminContent.style.display = 'block'; // Показываем контент для администратора
        } else if (userContent && role === 'user') {
            userContent.style.display = 'block'; // Показываем контент для пользователя
        }
    }

    // Прикрепляем прослушиватели событий к формам
    document.getElementById('registerForm')?.addEventListener('submit', registerUser);
    document.getElementById('loginForm')?.addEventListener('submit', loginUser);

    // Проверяем, есть ли сохраненный пользователь в localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        showContentBasedOnRole(user.role);
        document.getElementById('authMessage').textContent = `Добро пожаловать, ${user.username}. Ваша роль ${user.role}.`;
    }
});