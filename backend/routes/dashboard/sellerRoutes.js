const router = require('express').Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const sellerController = require('../../controllers/dasboard/sellerController');

router.get('/request-seller-get', authMiddleware, sellerController.request_seller_get);

module.exports = router;