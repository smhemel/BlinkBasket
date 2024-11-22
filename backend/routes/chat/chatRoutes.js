const router = require('express').Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const chatController = require('../controllers/chat/chatController');

router.post('/chat/customer/add-customer-friend', chatController.add_customer_friend);
 
module.exports = router;