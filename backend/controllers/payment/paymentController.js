const {v4: uuidv4} = require('uuid');
const sellerModel = require('../../models/sellerModel');
const stripeModel = require('../../models/stripeModel');
const { responseReturn } = require('../../utiles/response');
const stripe = require('stripe')('sk_test_51QPlfMGSOVK8WpbF8kcliA8uNU1iylSVy0d6JbEJYsXXcvzuZ6Ljf17n2YuKJaeqR98Px8VhXui0aW9U5NX5OaoY00IsbkFyfX');

class paymentController{
    create_stripe_connect_account = async(req, res) => {
        const {id} = req;
        const uid = uuidv4();

        try {
            const stripeInfo = await stripeModel.findOne({ sellerId: id  });

            if (stripeInfo) {
                await stripeModel.deleteOne({ sellerId: id });
                const account = await stripe.accounts.create({ type: 'express' });

                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url: 'http://localhost:3001/refresh',
                    return_url:  `http://localhost:3001/success?activeCode=${uid}`,
                    type: 'account_onboarding'
                });

                await stripeModel.create({ sellerId: id, stripeId: account.id, code: uid });

                responseReturn(res, 201, {url: accountLink.url});
            } else {
                const account = await stripe.accounts.create({ type: 'express' });
                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url: 'http://localhost:3001/refresh',
                    return_url:  `http://localhost:3001/success?activeCode=${uid}`,
                    type: 'account_onboarding'
                });

                await stripeModel.create({ sellerId: id, stripeId: account.id, code: uid });

                responseReturn(res, 201, {url: accountLink.url});
            }
            
        } catch (error) {
            console.log('strpe connect account errror' + error.message);
        }
    }

    active_stripe_connect_account = async (req, res) => {
        const {id} = req;
        const {activeCode} = req.params;

        try {
            const userStripeInfo = await stripeModel.findOne({ code: activeCode });
            
            if (userStripeInfo) {
                await sellerModel.findByIdAndUpdate(id, { payment: 'active' });
                responseReturn(res, 200, {message: 'payment Active'});
            } else {
                responseReturn(res, 404, {message: 'payment Active Fails'});
            } 
        } catch (error) {
            responseReturn(res, 500, {message: 'Internal Server Error'});
        } 
     }
}

module.exports = new paymentController();