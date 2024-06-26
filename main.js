document.addEventListener('DOMContentLoaded', (event) => {
    // Простая база данных пользователей с предварительно заполненными данными администратора и пользователя
    let users = JSON.parse(localStorage.getItem('users')) || [
        { username: 'Билол', password: 'билол123', role: 'admin' },
        { username: 'Макс', password: 'макс123', role: 'user' },
        { username: 'Мирик', password: 'мирик123', role: 'user' },
    ];

    // Функция для обработки входа в систему
    function loginUser(event) {
        event.preventDefault(); // Предотвращает отправку формы

        let username = document.getElementById('loginUsername')?.value; // Получаем имя пользователя из формы
        let password = document.getElementById('loginPassword')?.value; // Получаем пароль пользователя из формы

        // Приводим логин к нижнему регистру
        username = username?.toLowerCase();

        console.log(`Username: ${username}, Password: ${password}`);

        // Ищем пользователя
        let user = users.find(user => user.username.toLowerCase() === username && user.password === password);

        if (user) {
            console.log(`User found: ${user.username}`);
            // Сохраняем информацию о пользователе в localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            document.getElementById('authMessage').textContent = `Добро пожаловать, ${user.username}. Ваша роль ${user.role}.`; // Выводим сообщение о успешном входе
            // Проверяем роль пользователя и выполняем перенаправление
            if (user.role === 'user') {
                // Перенаправляем пользователя на user.html
                window.location.href = 'user.html';
            } else if (user.role === 'admin') {
                // Перенаправляем администратора на admin.html
                window.location.href = 'admin.html';
            }
        } else {
            console.log('User not found');
            document.getElementById('authMessage').textContent = 'Неверное имя пользователя или пароль!'; // Выводим сообщение об ошибке
        }
    }

    // Функция для выхода из системы
    function logoutUser() {
        // Удаляем информацию о пользователе из localStorage
        localStorage.removeItem('currentUser');
        // Перенаправление на index.html
        window.location.href = 'index.html';
    }

    // Функция для отображения зарегистрированных пользователей
    function displayUsers() {
        let userList = document.getElementById('userList');
        if (!userList) {
            console.error('Не удалось найти элемент для отображения пользователей.');
            return;
        }

        // Очищаем текущий список пользователей
        userList.innerHTML = '';

        // Добавляем каждого пользователя в список
        users.forEach(user => {
            let li = document.createElement('li');
            li.textContent = `Username: ${user.username}, Role: ${user.role}`;
            userList.appendChild(li);
        });
    }

    // Прикрепляем прослушиватель событий к форме
    document.getElementById('loginForm')?.addEventListener('submit', loginUser);

    // Отображаем зарегистрированных пользователей
    displayUsers();

    // Проверяем, есть ли сохранённый пользователь и перенаправляем его на соответствующую страницу
    //const savedUser = localStorage.getItem('currentUser');
    //if (savedUser) {
    //    const user = JSON.parse(savedUser);
    //    // Redirect to the appropriate page based on the user's role
    //    if (user.role === 'user') {
    //        window.location.href = 'user.html';
    //    } else if (user.role === 'admin') {
    //        window.location.href = 'admin.html';
    //    }
    //}
});