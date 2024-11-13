const router = require('express').Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const categoryController = require('../../controllers/dasboard/categoryController');

router.get('/category-get', authMiddleware, categoryController.get_category);
router.post('/category-add', authMiddleware, categoryController.add_category);

module.exports = router;