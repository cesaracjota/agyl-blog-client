import React from 'react';
import { Routes, Route } from "react-router-dom";
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/home/HomePage';
import PublicRoute from './PublicRoute';
import PrivateRoutes from './PrivateRoutes';
import SignupPage from '../pages/auth/SignupPage';
import { CreatePostPage, DetailPostPage } from '../pages/posts';
import { UserDetailPage } from '../pages/users';
import { ProfilePage } from '../pages/profile';

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="home" element={<HomePage />} />
                <Route path="new-post" element={<CreatePostPage />} />
            </Route>
            <Route element={<PublicRoute />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="new-user" element={<SignupPage />} />
            </Route>
            <Route path="/*" element={<HomePage />}/>
            <Route path="/p/:username/:slug" element={<DetailPostPage />} exact />
            <Route path="/a/:username" element={<UserDetailPage />} />
            <Route path="/profile/settings/profile" element={<ProfilePage />} />
            <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
    );
}