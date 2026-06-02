const express = require('express');
const path = require('path');
const stocksRouter = require('./routes/stocks');
const stocksService = require('./services/stocksService');

const app = express();
const PORT = 3000;

// Определяем путь к файлу данных
const DATA_FILE_PATH = path.join(__dirname, 'data/stocks.json');

// Инициализируем сервис с путем к файлу данных
stocksService.init(DATA_FILE_PATH);

// 1. Встроенный middleware для парсинга JSON
app.use(express.json());

// 2. Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 3. РАЗДАЧА СТАТИКИ - ИСПРАВЛЕННЫЙ ПУТЬ (поднимаемся на уровень выше)
app.use(express.static(path.join(__dirname, '..', 'public')));

// 4. Подключение маршрутов API
app.use('/stocks', stocksRouter);

// 5. Для всех остальных маршрутов (кроме API) - отдаем index.html
app.use((req, res, next) => {
    // Пропускаем API запросы (они уже обработаны раньше)
    if (req.path.startsWith('/stocks')) {
        return next();
    }
    // Для всех остальных - отдаем index.html (из папки public в корне)
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// 6. Глобальная обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// 7. error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// 8. Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
