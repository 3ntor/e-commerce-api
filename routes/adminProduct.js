const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middlwares/auth');
const adminProductController = require('../controllers/adminProductController');

router.use(auth, authorize('admin'));

router.get('/products', adminProductController.getAllProducts);
router.put('/products/:id', adminProductController.updateProduct);
router.delete('/products/:id', adminProductController.deleteProduct);    

module.exports = router;

