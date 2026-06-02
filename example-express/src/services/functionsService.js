const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (title) => {
    const functions = fileService.readData(dataFilePath);
    if (title) {
        return functions.filter(func =>
            func.title.toLowerCase().includes(title.toLowerCase())
        );
    }
    return functions;
};

const findOne = (id) => {
    const functions = fileService.readData(dataFilePath);
    return functions.find(func => func.id === Number(id));
};

const create = (functionData) => {
    const functions = fileService.readData(dataFilePath);

    const newId = functions.length > 0
        ? Math.max(...functions.map(f => f.id)) + 1
        : 1;

    const newFunction = { id: newId, ...functionData };
    functions.push(newFunction);
    fileService.writeData(dataFilePath, functions);

    return newFunction;
};

const update = (id, functionData) => {
    const functions = fileService.readData(dataFilePath);
    const index = functions.findIndex(f => f.id === Number(id));

    if (index === -1) return null;

    functions[index] = { ...functions[index], ...functionData };
    fileService.writeData(dataFilePath, functions);

    return functions[index];
};

const remove = (id) => {
    const functions = fileService.readData(dataFilePath);
    const filteredFunctions = functions.filter(f => f.id !== Number(id));

    if (filteredFunctions.length === functions.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredFunctions);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
