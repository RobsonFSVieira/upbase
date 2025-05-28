import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ViewPreferencesContext = createContext(null);

export const ViewPreferencesProvider = ({ children }) => {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState({
        defaultView: user?.role === 'admin' ? 'dashboard' : 'minhas-avaliacoes',
        showCompletedEvaluations: true,
        showInsights: true,
        columnsOrder: ['name', 'status', 'deadline', 'progress', 'actions'],
        sortBy: 'deadline',
        sortDirection: 'asc'
    });

    const updatePreferences = (newPreferences) => {
        setPreferences(prev => ({
            ...prev,
            ...newPreferences
        }));
    };

    return (
        <ViewPreferencesContext.Provider value={{ preferences, updatePreferences }}>
            {children}
        </ViewPreferencesContext.Provider>
    );
};

export const useViewPreferences = () => {
    const context = useContext(ViewPreferencesContext);
    if (!context) {
        throw new Error('useViewPreferences must be used within a ViewPreferencesProvider');
    }
    return context;
};
