const express = require('express');
const path = require('path');
const functionsRouter = require('./routes/functions');
const functionsService = require('./services/functionsService');

const app = express();
const PORT = 3000;

// Путь к файлу данных
const DATA_FILE_PATH = path.join(__dirname, 'data', 'functions.json');

// Инициализация сервиса
functionsService.init(DATA_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ===== ВАЖНО: API МАРШРУТЫ ДОЛЖНЫ БЫТЬ ПЕРВЫМИ =====
app.use('/functions', functionsRouter);

// ===== ПОТОМ СТАТИКА =====
app.use(express.static(path.join(__dirname, '..', 'public')));

// ===== ВСЁ ОСТАЛЬНОЕ - index.html =====
app.use((req, res, next) => {
    // Если запрос к API или к статике - пропускаем
    if (req.path.startsWith('/functions') || req.path.startsWith('/assets')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// 404 для API
app.use((req, res) => {
    if (req.path.startsWith('/functions')) {
        res.status(404).json({ error: 'API маршрут не найден' });
    } else {
        res.status(404).send('Not Found');
    }
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Ошибка:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
    console.log(`📊 API доступен по адресу: http://localhost:${PORT}/functions`);
});
