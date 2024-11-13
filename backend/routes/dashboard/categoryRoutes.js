const router = require('express').Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const categoryController = require('../../controllers/dasboard/categoryController');

router.post('/category-add', authMiddleware, categoryController.add_category);

module.exports = router;