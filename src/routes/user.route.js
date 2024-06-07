const router = require('express').Router();

const { userController } = require('../controllers/user.controller');
router.get('/', userController.findAll);
router.get('/:id', userController.findById);

router.post('/', userController.postById);

router.put('/:id', userController.updateById);

router.delete('/:id', userController.deleteById);

module.exports = router;
