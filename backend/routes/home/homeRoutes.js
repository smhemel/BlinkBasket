const router = require('express').Router();
const homeControllers = require('../../controllers/home/homeControllers');

router.get('/get-products', homeControllers.get_products);
router.get('/get-categories', homeControllers.get_categories);
 
module.exports = router;