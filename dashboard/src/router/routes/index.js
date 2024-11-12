import ProtectRoute from './ProtectRoute';
import { privateRoutes } from './privateRoutes';
import MainLayout from './../../layout/MainLayout';

export const getRoutes = () => {

    privateRoutes.map(r => r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>);

    return {
        path: "/",
        element: <MainLayout />,
        children: privateRoutes,
    };
};
