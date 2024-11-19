import "./App.css";
import Card from './pages/Card';
import Home from "./pages/Home";
import Shops from './pages/Shops';
import Login from './pages/Login';
import Details from './pages/Details';
import Shipping from './pages/Shipping';
import Register from './pages/Register';
import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { get_category } from './store/reducers/homeReducer';
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
        <Route path='/product/details/:slug' element={<Details />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
