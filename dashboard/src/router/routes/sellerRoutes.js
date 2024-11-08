import { lazy } from "react";
const Home = lazy(()=> import('../../views/Home'));
const AddProduct = lazy(()=> import('../../views/seller/AddProduct'));
const SellerDashboard = lazy(()=> import('../../views/seller/SellerDashboard'));

export const sellerRoutes = [
    {
        path: '/',
        element: <Home />,
        ability: ['admin','seller']
    },
    {
        path: '/seller/dashboard',
        element : <SellerDashboard />,
        ability : ['seller']
    },
    {
        path: '/seller/dashboard/add-product',
        element : <AddProduct />,
        ability : ['seller']
    }
]