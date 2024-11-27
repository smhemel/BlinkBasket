import axios from 'axios';
import React, { useState } from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_live_51QPlfMGSOVK8WpbFkRKqNoIuz5RSkReybvmFOEzDcOfBVdqImQsY73gwoOgZwnCXNjYcK5XfLWrEkZ2BuDMCIhlw0051HGabPR');

const Stripe = ({ price, orderId }) => {
    const apperance = { theme: 'stripe' };
    const options = { apperance, clientSecret };

    const [clientSecret, setClientSecret] = useState('');

    const create_payment = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/order/create-payment', {price}, {withCredentials:true});
            setClientSecret(data.clientSecret);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div className='mt-4'>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                ) : <button onClick={create_payment} className='px-10 py-[6px] rounded-sm hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>Start Payment</button>
            }
        </div>
    );
}; 

export default Stripe;