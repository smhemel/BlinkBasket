const { mongo: {ObjectId}} = require('mongoose');
const authOrder = require('../../models/authOrder'); 
const sellerModel = require('../../models/sellerModel');
const myShopWallet = require('../../models/myShopWallet');
const productModel = require('../../models/productModel');
const sellerWallet = require('../../models/sellerWallet'); 
const customerOrder = require('../../models/customerOrder');
const { responseReturn } = require("../../utiles/response");
const adminSellerMessage = require('../../models/chat/adminSellerMessage');
const sellerCustomerMessage = require('../../models/chat/sellerCustomerMessage');

class dashboardController {
    get_admin_dashboard_data = async(req, res) => {
        const {id} = req;

        try {
            const totalSale = await myShopWallet.aggregate([
                {
                    $group: { _id:null, totalAmount: {$sum: '$amount'} }
                }
            ]);

            const totalProduct = await productModel.find({}).countDocuments();
            const totalOrder = await customerOrder.find({}).countDocuments();
            const totalSeller = await sellerModel.find({}).countDocuments();
            const messages = await adminSellerMessage.find({}).limit(3);
            const recentOrders = await customerOrder.find({}).limit(5);

            responseReturn(res, 200, {
                totalProduct,
                totalOrder,
                totalSeller,
                messages,
                recentOrders,
                totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    get_seller_dashboard_data = async (req, res) => {
        const {id} = req;

        try {
            const totalSale = await sellerWallet.aggregate([
                { $match: { sellerId: { $eq: id }} },
                { $group: {_id:null, totalAmount: {$sum: '$amount'}} }
            ]);

            const totalOrder = await authOrder.find({ sellerId: new ObjectId(id) }).countDocuments();
            const totalProduct = await productModel.find({ sellerId: new ObjectId(id) }).countDocuments();
            const totalPendingOrder = await authOrder .find({
                $and:[
                    { sellerId: {$eq: new ObjectId(id)} },
                    { delivery_status :{$eq: 'pending'} }
                ]
            }).countDocuments();

            const messages = await sellerCustomerMessage.find({
                $or: [
                    { senderId: {$eq: id} },
                    { receverId: {$eq: id} }
                ]
            }).limit(3);

            const recentOrders = await authOrder.find({ sellerId: new ObjectId(id) }).limit(5);

            responseReturn(res, 200, {
                totalProduct,
                totalOrder,
                totalPendingOrder,
                messages,
                recentOrders,
                totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new dashboardController();