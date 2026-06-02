const functionsService = require('../services/functionsService');

const getAllFunctions = (req, res) => {
    const { title } = req.query;
    const functions = functionsService.findAll(title);
    res.json(functions);
};

const getFunctionById = (req, res) => {
    const id = parseInt(req.params.id);
    const func = functionsService.findOne(id);

    if (!func) {
        return res.status(404).json({ error: 'Функция не найдена' });
    }

    res.json(func);
};

const createFunction = (req, res) => {
    const { src, title, text } = req.body;

    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const newFunction = functionsService.create({ src, title, text });
    res.status(201).json(newFunction);
};

const updateFunction = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedFunction = functionsService.update(id, req.body);

    if (!updatedFunction) {
        return res.status(404).json({ error: 'Функция не найдена' });
    }

    res.json(updatedFunction);
};

const deleteFunction = (req, res) => {
    const id = parseInt(req.params.id);
    const success = functionsService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Функция не найдена' });
    }

    res.status(204).send();
};

module.exports = {
    getAllFunctions,
    getFunctionById,
    createFunction,
    updateFunction,
    deleteFunction
};
