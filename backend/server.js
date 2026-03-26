const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_FILE = path.join(__dirname, 'stocks.json');

if (!fs.existsSync(DATA_FILE)) {
    const data = [
        {
            "id": 1,
            "icon": "images/calculators.png",
            "title": "Calculators",
            "text": "Calculators and convertors for STEM, finance, fitness, construction, cooking, and more"
        },
        {
            "id": 2,
            "icon": "images/cheat-sheets.png",
            "title": "Cheat Sheets",
            "text": "A quick reference guide for math formulas"
        },
        {
            "id": 3,
            "icon": "images/groups.png",
            "title": "Groups",
            "text": "Create a study group and share problems, notes and quizzes"
        }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/stocks', (req, res) => {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
});

app.get('/stocks/:id', (req, res) => {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const stocks = JSON.parse(data);
    const stock = stocks.find(s => s.id === parseInt(req.params.id));
    if (!stock) return res.status(404).json({ error: 'Not found' });
    res.json(stock);
});

app.post('/stocks', (req, res) => {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const stocks = JSON.parse(data);
    const newId = stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1;
    const newStock = { id: newId, ...req.body };
    stocks.push(newStock);
    fs.writeFileSync(DATA_FILE, JSON.stringify(stocks, null, 2));
    res.status(201).json(newStock);
});

app.patch('/stocks/:id', (req, res) => {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const stocks = JSON.parse(data);
    const index = stocks.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    stocks[index] = { ...stocks[index], ...req.body };
    fs.writeFileSync(DATA_FILE, JSON.stringify(stocks, null, 2));
    res.json(stocks[index]);
});

app.delete('/stocks/:id', (req, res) => {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const stocks = JSON.parse(data);
    const filtered = stocks.filter(s => s.id !== parseInt(req.params.id));
    if (filtered.length === stocks.length) return res.status(404).json({ error: 'Not found' });
    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
