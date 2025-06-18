const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middlwares/auth');
const wishlistController = require('../controllers/wishlistController');

router.use(auth, authorize('user', 'admin'));
router.get('/', wishlistController.getWishlist);
router.post('/add/:id', wishlistController.addToWishlist);
router.delete('/remove/:id', wishlistController.removeFromWishlist);

module.exports = router;