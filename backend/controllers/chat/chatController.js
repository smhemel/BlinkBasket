const sellerModel = require("../../models/sellerModel");
const customerModel = require("../../models/customerModel");
const { responseReturn } = require('../../utiles/response');
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const sellerCustomerMessage = require('../../models/chat/sellerCustomerMessage');

class chatController {
    add_customer_friend = async (req, res) => {
        const { sellerId, userId } = req.body;

        try {
            if (sellerId !== "") {
                const user = await customerModel.findById(userId);
                const seller = await sellerModel.findById(sellerId);

                const checkSeller = await sellerCustomerModel.findOne({
                    $and: [
                        {myId: { $eq: userId }},
                        {myFriends: { $elemMatch: { friendId: sellerId } }}
                    ]
                });

                if (!checkSeller) {
                    await sellerCustomerModel.updateOne(
                        { myId: userId },
                        {
                            $push: {
                                myFriends: {
                                    friendId: sellerId,
                                    name: seller.shopInfo?.shopName,
                                    image: seller.image
                                }
                            }
                        }
                    );
                }

                const checkCustomer = await sellerCustomerModel.findOne({
                    $and: [
                        {myId: { $eq: sellerId }},
                        {myFriends: { $elemMatch: { friendId: userId } }}
                    ]
                });

                if (!checkCustomer) {
                    await sellerCustomerModel.updateOne(
                        { myId: sellerId },
                        {
                            $push: {
                                myFriends: {
                                    friendId: userId,
                                    name: user.name,
                                    image: ""
                                }
                            }
                        }
                    );
                }

                const messages = await sellerCustomerMessage.find({
                    $or: [
                        {
                            $and: [
                                { receverId: {$eq: sellerId} },
                                { senderId: {$eq: userId} }
                            ]
                        },
                        {
                            $and: [
                                { receverId: {$eq: userId} },
                                { senderId: {$eq: sellerId} }
                            ]
                        }
                    ]
                });

                const MyFriends = await sellerCustomerModel.findOne({ myId: userId });
                const currentFd = MyFriends.myFriends.find(s => s.fdId === sellerId);
                responseReturn(res, 200, {
                    MyFriends: MyFriends.myFriends,
                    currentFd,
                    messages
                });
            } else {
                const MyFriends = await sellerCustomerModel.findOne({ myId: userId });
                responseReturn(res, 200, { MyFriends: MyFriends.myFriends });
            }
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = new chatController();
