const router = require('express').Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const categoryController = require('../../controllers/dashboard/categoryController');

router.get('/category-get', authMiddleware, categoryController.get_category);
router.post('/category-add', authMiddleware, categoryController.add_category);
router.put('/category-update/:id', authMiddleware, categoryController.update_category);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;