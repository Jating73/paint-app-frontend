import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PaintPage from './pages/PaintPage';

function WebRouter() {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage />}>
            </Route>
            <Route exact path="/login" element={<LoginPage />}>
            </Route>
            <Route path="/register" element={<RegisterPage />}>
            </Route>
            <Route path="/paint" element={<PaintPage />}>
            </Route>
        </Routes>
    );
}

export default WebRouter;
