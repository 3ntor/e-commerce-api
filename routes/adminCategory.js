const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middlwares/auth');
const adminCategory = require('../controllers/adminCategoryController');

router.use(auth, authorize('admin'));

router.get('/categories', adminCategory.getAllCategories);
router.post('/categories', adminCategory.createCategory);
router.put('/categories/:id', adminCategory.updateCategory);
router.delete('/categories/:id', adminCategory.deleteCategory);

module.exports = router;