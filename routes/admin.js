const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middlwares/auth');
const adminController = require('../controllers/adminController');

router.use(auth, authorize('admin'));

router.get('/admins', adminController.getAdmins);
router.post('/admins', adminController.creatAdmin);
router.put('/admins/:id', adminController.updateAdmin);
router.delete('/admins/:id', adminController.deleteAdmin);

module.exports = router;
