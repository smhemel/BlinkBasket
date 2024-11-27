const router = require('express').Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const paymentController = require('../controllers/payment/paymentController');
 
router.get('/payment/create-stripe-connect-account', authMiddleware, paymentController.create_stripe_connect_account);
 
module.exports = router;