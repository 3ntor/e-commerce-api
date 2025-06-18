const express = require('express');
const router = express.Router();
const userProductController = require('../controllers/userProductController');
const { auth, authorize } = require('../middlwares/auth');

router.use(auth, authorize('user', 'admin'));

router.get('/', userProductController.getMyProducts);
router.post('/', userProductController.createProduct);
router.put('/:id', userProductController.updateProduct);
router.delete('/:id', userProductController.deleteProduct);

module.exports = router;