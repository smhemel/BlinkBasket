import Header from './Header'; 
import Sidebar from './Sidebar';
import { socket } from '../utils/utils';
import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomer, updateSellers } from '../store/Reducers/chatReducer';

const MainLayout = () => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.auth);

    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        socket.on('activeCustomer', (customers) => {
            dispatch(updateCustomer(customers));
        });

        socket.on('activeSeller',(sellers) => {
            dispatch(updateSellers(sellers));
        });
    },[])

    useEffect(() => {
        if (userInfo && userInfo.role === 'seller') {
            socket.emit('add_seller', userInfo._id, userInfo);
        } else {
            socket.emit('add_admin', userInfo);
        }
    },[userInfo])

    return (
        <div className='bg-[#cdcae9] w-full min-h-screen'>
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
            <div className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
                <Outlet/>
           </div>
        </div>
    );
};

export default MainLayout;