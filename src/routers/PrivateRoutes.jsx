import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoutes = () => {

    const { user } = useSelector(state => state.auth);

    // const user = JSON.parse(localStorage.getItem('user_agyl_post'));

    const location = useLocation();

    return(
        user ? <Outlet /> : <Navigate to={ '/' } state={{ from: location }} replace />
    )

};

export default PrivateRoutes;