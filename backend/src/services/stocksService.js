const fs = require('fs');
const path = require('path');

let dataPath = null;

const init = (filePath) => {
    dataPath = filePath;
};

const findAll = () => {
    if (!dataPath) return [];
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error:', err);
        return [];
    }
};

const findOne = (id) => {
    const stocks = findAll();
    return stocks.find(stock => stock.id === id);
};

const create = (stockData) => {
    const stocks = findAll();
    const newId = stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1;
    const newStock = { id: newId, ...stockData };
    stocks.push(newStock);
    fs.writeFileSync(dataPath, JSON.stringify(stocks, null, 2), 'utf8');
    return newStock;
};

const update = (id, stockData) => {
    const stocks = findAll();
    const index = stocks.findIndex(s => s.id === id);
    if (index === -1) return null;
    stocks[index] = { ...stocks[index], ...stockData };
    fs.writeFileSync(dataPath, JSON.stringify(stocks, null, 2), 'utf8');
    return stocks[index];
};

const remove = (id) => {
    const stocks = findAll();
    const filteredStocks = stocks.filter(s => s.id !== id);
    if (filteredStocks.length === stocks.length) return false;
    fs.writeFileSync(dataPath, JSON.stringify(filteredStocks, null, 2), 'utf8');
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };