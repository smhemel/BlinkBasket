const router = require('express').Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const dashboardController = require('../../controllers/dasboard/dashboardController');
  
router.get('/admin/get-dashboard-data', authMiddleware, dashboardController.get_admin_dashboard_data);
router.get('/seller/get-dashboard-data', authMiddleware, dashboardController.get_seller_dashboard_data);

router.get('/banner/get/:productId', authMiddleware, dashboardController.get_banner);
    
module.exports = router;