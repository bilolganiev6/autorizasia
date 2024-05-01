// Простая база данных пользователей с предварительно заполненными данными администратора и пользователя
let users = [
    { username: 'Билол', password: 'билол123', role: 'admin' },
    { username: 'Макс', password: 'макс123', role: 'user' },
    { username: 'Мирик', password: 'мирик123', role: 'user' },
  ];

// Функция для обработки регистрации
function registerUser(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let role = 'user'; // Роль по умолчанию для регистрации

    // Проверьте, существует ли пользователь уже сейчас
    if (users.some(user => user.username === username)) {
        alert('User already exists!');
        return;
    }

   // Добавить нового пользователя
    users.push({ username, password, role });
    alert('Пользователь успешно зарегистрировался!');
}

// Функция для обработки входа в систему
function loginUser(event) {
    event.preventDefault();

    let username = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;

    // Найти пользователя
    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        document.getElementById('authMessage').textContent = `Добро пожаловать, ${user.username}. Ваша роль ${user.role}.`;
        showContentBasedOnRole(user.role);
    } else {
        document.getElementById('authMessage').textContent = 'Неверное имя пользователя или пароль!';
    }
}
// Функция отображения контента в зависимости от роли пользователя
function showContentBasedOnRole(role) {
    if (role === 'admin') {
        document.getElementById('adminContent').style.display = 'block';
    } else if (role === 'user') {
        document.getElementById('userContent').style.display = 'block';
    }
}

// Прикреплять прослушиватели событий к формам
document.getElementById('registerForm').addEventListener('submit', registerUser);
document.getElementById('loginForm').addEventListener('submit', loginUser);