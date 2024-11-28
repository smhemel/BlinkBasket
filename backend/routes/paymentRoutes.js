const router = require('express').Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const paymentController = require('../controllers/payment/paymentController');
 
router.get('/payment/create-stripe-connect-account', authMiddleware, paymentController.create_stripe_connect_account);
router.put('/payment/active-stripe-connect-account/:activeCode', authMiddleware, paymentController.active_stripe_connect_account);
router.get('/payment/seller-payment-details/:sellerId', authMiddleware, paymentController.get_seller_payment_details);
 
module.exports = router;