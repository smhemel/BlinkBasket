const router = require('express').Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const productController = require('../../controllers/dasboard/productController');

router.post('/product-add',authMiddleware, productController.add_product);

module.exports = router;