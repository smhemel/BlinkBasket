import error from '../assets/error.png';
import { useDispatch } from 'react-redux';
import success from '../assets/success.png';
import { FadeLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useSelector } from 'react';
import { active_stripe_connect_account, messageClear } from '../store/Reducers/sellerReducer';

const Success = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const activeCode = queryParams.get('activeCode');
    const queryParams = new URLSearchParams(window.location.search);

    const {loader, successMessage, errorMessage} = useSelector(state => state.seller);
    
    useEffect(()=> {
        dispatch(active_stripe_connect_account(activeCode));
    },[activeCode])

    const redirect = () => {
        dispatch(messageClear());
        navigate('/');
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
            { loader ? 
                <FadeLoader/> 
                  : errorMessage ? 
                    <>
                        <img src={error} alt="" />
                        <button onClick={redirect} className='px-5 py-2 bg-green-700 rounded-sm text-white'>Back to Dashboard</button>
                    </> 
                    : successMessage && 
                    <>
                    <img src={success} alt="" />
                        <button onClick={redirect} className='px-5 py-2 bg-green-700 rounded-sm text-white'>Back to Dashboard</button>
                    </>
            }
        </div>
    );
};

export default Success;