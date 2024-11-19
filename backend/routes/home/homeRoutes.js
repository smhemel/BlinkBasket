const router = require('express').Router();
const homeControllers = require('../../controllers/home/homeControllers');

router.get('/get-products', homeControllers.get_products);
router.get('/get-categories', homeControllers.get_categories);
router.get('/price-range-latest-product', homeControllers.price_range_product);
 
module.exports = router;