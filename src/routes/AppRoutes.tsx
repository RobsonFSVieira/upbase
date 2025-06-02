import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/Layout';
import RegisterTest from '../pages/auth/RegisterTest';
import Home from '../pages/Home';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/register-test" element={<RegisterTest />} />
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;