const router = require('express').Router();

const { bookController } = require('../controllers/book.controller');
router.get('/', bookController.findAll);
router.get('/:id', bookController.findById);

router.post('/', bookController.postById);

router.put('/:id', bookController.updateById);

router.delete('/:id', bookController.deleteById);

module.exports = router;
