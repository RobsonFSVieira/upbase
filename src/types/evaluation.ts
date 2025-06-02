export interface EvaluationCriteria {
    id: string;
    name: string;
    description: string;
    weight: number;
}

export interface Evaluation {
    id: string;
    evaluated_id: string;
    evaluator_id: string;
    period: string;
    status: 'draft' | 'in_progress' | 'completed';
    scores: Array<{
        criteria_id: string;
        score: number;
        comment?: string;
    }>;
    created_at: string;
    updated_at: string;
}
