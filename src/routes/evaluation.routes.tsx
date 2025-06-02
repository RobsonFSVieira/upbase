import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const EvaluationRoutes = () => {
    return (
        <Routes>
            <Route path="/new" element={<EvaluationForm />} />
            <Route path="/edit/:id" element={<EvaluationForm />} />
            <Route path="/list" element={<EvaluationList />} />
        </Routes>
    );
};
