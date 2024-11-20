const moment = require("moment");
const cardModel = require('../../models/cardModel');
const authOrderModel = require('../../models/authOrder');
const customerOrder = require('../../models/customerOrder');

class orderController {
    paymentCheck = async (id) => {
        try {
            const order = await customerOrder.findById(id);

            if (order.payment_status === 'unpaid') {
                await customerOrder.findByIdAndUpdate(id, {delivery_status: 'cancelled'});
                await authOrderModel.updateMany(
                    {orderId: id},
                    {delivery_status: 'cancelled'}
                );
            }

            return true;
        } catch (error) {
            
        }
    }

    place_order = async (req, res) => {
        const {price,products,shipping_fee,shippingInfo,userId } = req.body;

        let cardId = [];
        let authorOrderData = [];
        const tempDate = moment(Date.now()).format('LLL');

        let customerOrderProduct = [];
        for (let i = 0; i < products.length; i++) {
            const pro = products[i].products;

            for (let j = 0; j < pro.length; j++) {
                const tempCusPro = pro[j].productInfo;
                tempCusPro.quantity = pro[j].quantity;
                customerOrderProduct.push(tempCusPro);

                if (pro[j]._id) {
                    cardId.push(pro[j]._id);
                } 
            } 
        }

        try {
            const order = await customerOrder.create({
                customerId: userId,
                products: customerOrderProduct,
                price: price + shipping_fee,
                payment_status: 'unpaid',
                delivery_status: 'pending',
                date: tempDate
            });

            for (let i = 0; i < products.length; i++) {
                const pro = products[i].products;
                const pri = products[i].price;
                const sellerId = products[i].sellerId;

                let storePor = [];
                for (let j = 0; j < pro.length; j++) {
                    const tempPro = pro[j].productInfo;
                    tempPro.quantity = pro[j].quantity;
                    storePor.push(tempPro);               
                }

                authorOrderData.push({
                    orderId: order.id,sellerId,
                    products: storePor,
                    price:pri,
                    payment_status: 'unpaid',
                    shippingInfo: 'Easy Main Warehouse',
                    delivery_status: 'pending',
                    date: tempDate
                });
            }

            await authOrderModel.insertMany(authorOrderData);
            for (let k = 0; k < cardId.length; k++) {
                await cardModel.findByIdAndDelete(cardId[k]);
            }

            setTimeout(() => {
                this.paymentCheck(order.id);
            }, 15000)

            responseReturn(res, 200, {message: "Order Placed Success", orderId: order.id});
        } catch (error) {
            
        }
    }
}

module.exports = new orderController();