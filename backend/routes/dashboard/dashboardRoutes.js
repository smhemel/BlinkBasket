const router = require('express').Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const dashboardController = require('../../controllers/dasboard/dashboardController');
  
router.get('/admin/get-dashboard-data', authMiddleware, dashboardController.get_admin_dashboard_data);
    
module.exports = router;