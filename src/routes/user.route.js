const router = require('express').Router();

const { userController } = require('../controllers/user.controller');

router.get('/:id', userController.findById);
router.get('/', userController.findAll);

router.post('/', userController.postById);

router.put('/:id', userController.updateById);

router.delete('/:id', userController.deleteById);

module.exports = router;
