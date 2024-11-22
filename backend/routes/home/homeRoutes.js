const router = require('express').Router();
const homeControllers = require('../../controllers/home/homeControllers');

router.get('/get-products', homeControllers.get_products);
router.get('/get-categories', homeControllers.get_categories);
router.get('/price-range-latest-product', homeControllers.price_range_product);
router.get('/query-products', homeControllers.query_products);
router.get('/product-details/:slug', homeControllers.product_details);
 
module.exports = router;