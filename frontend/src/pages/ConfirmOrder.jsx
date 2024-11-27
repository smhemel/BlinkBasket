import axios from 'axios';
import error from '../assets/error.png';
import { Link } from 'react-router-dom';
import success from '../assets/success.png';
import { FadeLoader } from 'react-spinners';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';

const load = async() => {
    return await loadStripe('pk_live_51QPlfMGSOVK8WpbFkRKqNoIuz5RSkReybvmFOEzDcOfBVdqImQsY73gwoOgZwnCXNjYcK5XfLWrEkZ2BuDMCIhlw0051HGabPR');
}

const ConfirmOrder = () => {
    const [stripe, setStripe] = useState('');
    const [loader, setLoader] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        get_load();
    },[])

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');
        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch(paymentIntent.status) {
                case "succeeded":
                    setMessage('succeeded');
                    break
                case "processing":
                    setMessage('processing');
                    break
                case "requires_payment_method":
                    setMessage('failed');
                    break
                default:
                    setMessage('failed');
            }
        });
    },[stripe])

    useEffect(() => {
        if (message === 'succeeded') {
            update_payment();
        }
    },[message])

    const get_load = async () => {
        const tempStripe = await load();
        setStripe(tempStripe);
    }

    const update_payment = async() => {
        const orderId = localStorage.getItem('orderId');

        if (orderId) {
            try {
                await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`);

                localStorage.removeItem('orderId');
                setLoader(false);
            } catch (error) {
                console.log(error.response.data);
            }
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            { (message === 'failed' || message === 'processing') ?
                <>
                    <img src={error} alt="" />
                    <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard </Link>
                </> 
                : message === 'succeeded' ? loader ? 
                    <FadeLoader/> 
                   : 
                    <>
                        <img src={success} alt="" />
                        <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard </Link>
                    </> 
                : 
                <FadeLoader/> 
            }
        </div>
    );
};

export default ConfirmOrder;