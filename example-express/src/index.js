const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express сервер работает!');
});

// Добавьте маршрут для API
app.get('/api', (req, res) => {
  res.json({ message: 'API работает!' });
});

// Запуск сервера - сервер должен слушать порт постоянно
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен по адресу http://localhost:${PORT}`);
  console.log(`📡 Доступные маршруты:`);
  console.log(`   - http://localhost:${PORT}/`);
  console.log(`   - http://localhost:${PORT}/api`);
});
