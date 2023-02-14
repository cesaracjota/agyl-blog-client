import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = () => {

    const { user } = useSelector(state => state.auth);

    // const user = JSON.parse(localStorage.getItem('user_agyl_post'));

    const location = useLocation();

    return(

        user ? <Navigate to={ '/' } state={{ from: location }} replace /> : <Outlet />
    
    )
}

export default PublicRoute;