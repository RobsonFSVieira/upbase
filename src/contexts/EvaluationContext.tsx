import React, { createContext, useContext, useState } from 'react';
import { evaluationService } from '../services/evaluationService';

interface EvaluationContextType {
    currentEvaluation: any | null;
    loading: boolean;
    error: string | null;
    loadEvaluation: (id: string) => Promise<void>;
    saveEvaluation: (data: any) => Promise<void>;
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

export const EvaluationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentEvaluation, setCurrentEvaluation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadEvaluation = async (id: string) => {
        try {
            setLoading(true);
            const data = await evaluationService.getEvaluationById(id);
            setCurrentEvaluation(data);
        } catch (err) {
            setError('Erro ao carregar avaliação');
        } finally {
            setLoading(false);
        }
    };

    const saveEvaluation = async (data: any) => {
        try {
            setLoading(true);
            await evaluationService.saveEvaluation(data);
        } catch (err) {
            setError('Erro ao salvar avaliação');
        } finally {
            setLoading(false);
        }
    };

    return (
        <EvaluationContext.Provider
            value={{
                currentEvaluation,
                loading,
                error,
                loadEvaluation,
                saveEvaluation
            }}
        >
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
