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

        // Получаем элементы формы по их id
        let usernameInput = document.getElementById('loginUsername');
        let passwordInput = document.getElementById('loginPassword');

        // Проверяем, что элементы существуют и не равны null
        if (!usernameInput || !passwordInput) {
            console.error('Не удалось найти элементы формы регистрации.');
            return;
        }

        // Получаем значения из элементов формы
        let username = usernameInput.value;
        let password = passwordInput.value;
        let role = 'user'; // Роль по умолчанию для регистрации

        // Проверяем, существует ли пользователь уже сейчас
        if (users.some(user => user.username === username)) {
            alert('Пользователь с таким именем уже существует!');
            return;
        }

        // Добавляем нового пользователя
        users.push({ username, password, role });
        alert('Пользователь успешно зарегистрирован!');

        // Выводим содержимое массива users в консоль
        console.log('Пользователи после регистрации:', users);
    }

    // Прикрепляем прослушиватель события к форме
    let loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', registerUser);
    } else {
        console.error('Не удалось найти форму регистрации.');
    }
});