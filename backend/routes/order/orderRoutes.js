const router = require('express').Router();
const orderController = require('../../controllers/order/orderController');

router.post('/home/order/place-order', orderController.place_order);
router.get('/home/coustomer/get-orders/:customerId/:status', orderController.get_orders);
router.get('/home/coustomer/get-order-details/:orderId', orderController.get_order_details);
router.get('/home/coustomer/get-dashboard-data/:userId', orderController.get_customer_dashboard_data);
 
module.exports = router;