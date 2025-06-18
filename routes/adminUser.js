const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middlwares/auth');
const adminUserController = require('../controllers/adminUserController');

router.use(auth, authorize('admin'));

router.get('/users', adminUserController.getAllUsers);
router.delete('/users/:id', adminUserController.deleteUser);

module.exports = router;