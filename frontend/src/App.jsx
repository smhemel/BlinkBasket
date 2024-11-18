import "./App.css";
import Card from './pages/Card';
import Home from "./pages/Home";
import Shops from './pages/Shops';
import Details from './pages/Details';
import Shipping from './pages/Shipping';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/card' element={<Card />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/product/details/:slug' element={<Details />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
