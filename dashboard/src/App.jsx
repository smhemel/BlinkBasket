/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import Router from './router/Router';
import { useEffect, useState } from 'react';
import { getRoutes } from "./router/routes";
import publicRoutes from './router/routes/publicRoutes';

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  },[])

  return <Router allRoutes={allRoutes} />
}

export default App;
