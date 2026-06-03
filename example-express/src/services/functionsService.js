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


    const newFunction = { id: newId, ...functionData, comments: [] };
    functions.push(newFunction);
    fileService.writeData(dataFilePath, functions);

    return newFunction;
};

const update = (id, functionData) => {
    const functions = fileService.readData(dataFilePath);
    const index = functions.findIndex(f => f.id === Number(id));

    if (index === -1) return null;


    const existingComments = functions[index].comments || [];
    functions[index] = {
        ...functions[index],
        ...functionData,
        comments: functionData.comments !== undefined ? functionData.comments : existingComments
    };
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


const addComment = (id, commentText) => {
        const functions = fileService.readData(dataFilePath);
        const index = functions.findIndex(f => f.id === id);

        if (index === -1) return null;


        if (!functions[index].comments) {
            functions[index].comments = [];
        }


        functions[index].comments.push(commentText);


        fileService.writeData(dataFilePath, functions);


        return functions[index];
};

module.exports = { init, findAll, findOne, create, update, remove, addComment };
