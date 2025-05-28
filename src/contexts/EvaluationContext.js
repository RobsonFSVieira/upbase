import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { evaluationFormsService } from '../services/evaluationFormsService';
import { evaluationsService } from '../services/evaluationsService';

const EvaluationContext = createContext(null);

export const EvaluationProvider = ({ children }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [templates, setTemplates] = useState([]);
    const [pendingEvaluations, setPendingEvaluations] = useState([]);
    const [evaluationHistory, setEvaluationHistory] = useState([]);
    const [evaluationStats, setEvaluationStats] = useState(null);

    // Load initial data
    const loadData = useCallback(async () => {
        if (!user) return;

        try {
            setLoading(true);
            const [templatesData, pendingData, historyData, statsData] = await Promise.all([
                evaluationFormsService.getFormTemplates(),
                evaluationsService.getPendingEvaluations(user.id),
                evaluationsService.getEvaluationHistory(user.id),
                evaluationsService.getEvaluationStats(user.id)
            ]);

            setTemplates(templatesData);
            setPendingEvaluations(pendingData);
            setEvaluationHistory(historyData);
            setEvaluationStats(statsData);
        } catch (error) {
            console.error('Error loading evaluation data:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Template management
    const createFormTemplate = useCallback(async (template) => {
        const newTemplate = await evaluationFormsService.createFormTemplate({
            ...template,
            userId: user.id
        });
        setTemplates(prev => [newTemplate, ...prev]);
        return newTemplate;
    }, [user]);

    const updateFormTemplate = useCallback(async (id, template) => {
        const updatedTemplate = await evaluationFormsService.updateFormTemplate(id, {
            ...template,
            userId: user.id
        });
        setTemplates(prev => prev.map(t => t.id === id ? updatedTemplate : t));
        return updatedTemplate;
    }, [user]);

    const changeFormStatus = useCallback(async (id, newStatus) => {
        const updatedTemplate = await evaluationFormsService.changeFormStatus(id, newStatus, user.id);
        setTemplates(prev => prev.map(t => t.id === id ? updatedTemplate : t));
        return updatedTemplate;
    }, [user]);

    // Evaluation management
    const createEvaluation = useCallback(async (evaluation) => {
        const newEvaluation = await evaluationsService.createEvaluation({
            ...evaluation,
            evaluatorId: user.id
        });
        setPendingEvaluations(prev => [newEvaluation, ...prev]);
        return newEvaluation;
    }, [user]);

    const submitEvaluation = useCallback(async (id, responses) => {
        const submittedEvaluation = await evaluationsService.submitEvaluation(id, responses, user.id);
        setPendingEvaluations(prev => prev.filter(e => e.id !== id));
        setEvaluationHistory(prev => [submittedEvaluation, ...prev]);
        await loadData(); // Reload stats
        return submittedEvaluation;
    }, [user, loadData]);

    const value = {
        loading,
        templates,
        pendingEvaluations,
        evaluationHistory,
        evaluationStats,
        createFormTemplate,
        updateFormTemplate,
        changeFormStatus,
        createEvaluation,
        submitEvaluation,
        refresh: loadData
    };

    return (
        <EvaluationContext.Provider value={value}>
            {children}
        </EvaluationContext.Provider>
    );
};

export const useEvaluation = () => {
    const context = useContext(EvaluationContext);
    if (!context) {
        throw new Error('useEvaluation must be used within an EvaluationProvider');
    }
    return context;
};
