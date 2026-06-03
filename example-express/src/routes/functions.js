const express = require('express');
const router = express.Router();
const functionsController = require('../controllers/functionsController');

router.get('/', functionsController.getAllFunctions);
router.get('/:id', functionsController.getFunctionById);
router.post('/', functionsController.createFunction);
router.patch('/:id', functionsController.updateFunction);
router.delete('/:id', functionsController.deleteFunction);
router.post('/:id/comments', functionsController.addComment);

module.exports = router;
