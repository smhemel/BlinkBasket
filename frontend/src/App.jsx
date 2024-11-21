import "./App.css";
import Card from './pages/Card';
import Home from "./pages/Home";
import Shops from './pages/Shops';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Details from './pages/Details';
import Shipping from './pages/Shipping';
import Register from './pages/Register';
import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import Dashboard from './pages/Dashboard';
import ProtectUser from './utils/ProtectUser';
import CategoryShop from './pages/CategoryShop';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';
import SearchProducts from './pages/SearchProducts';
import Wishlist from './components/dashboard/Wishlist';
import { get_category } from './store/reducers/homeReducer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChangePassword from './components/dashboard/ChangePassword';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_category());
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/card' element={<Card />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/products?' element={<CategoryShop />} />
        <Route path='/product/details/:slug' element={<Details />} /> 
        <Route path='/products/search?' element={<SearchProducts />} />
        <Route path='/dashboard' element={<ProtectUser />} >
          <Route path='' element={<Dashboard />} >
            <Route path='' element={<Index />} />
            <Route path='my-orders' element={<Orders/>} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='my-wishlist' element={<Wishlist />} /> 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
