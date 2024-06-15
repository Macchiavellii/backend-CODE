const router = require('express').Router();

const { utentiController } = require('../controllers/user.controller');
router.get('/', utentiController.findAll);
router.get('/:id', utentiController.findById);

router.post('/', utentiController.postById);

router.put('/:id', utentiController.updateById);

router.delete('/:id', utentiController.deleteById);

module.exports = router;
