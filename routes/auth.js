const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middlwares/auth');

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
// Get current authenticated user
router.get('/me', auth, (req, res) => {
  res.json({ id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role });
});

module.exports = router;
