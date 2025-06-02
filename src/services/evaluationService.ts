import { supabase } from '../lib/supabase';
import { Evaluation } from '../types/evaluation';

interface Template {
    criterias: Array<{
        id: string;
        name: string;
        weight: number;
    }>;
}

export const evaluationService = {
    async createEvaluation(data: Partial<Evaluation>) {
        const { data: evaluation, error } = await supabase
            .from('evaluations')
            .insert(data)
            .select()
            .single();

        if (error) throw error;
        return evaluation;
    },

    async getEvaluationById(id: string) {
        const { data: evaluation, error } = await supabase
            .from('evaluations')
            .select(`
        *,
        evaluated:profiles!evaluated_id(*),
        evaluator:profiles!evaluator_id(*)
      `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return evaluation;
    },

    async getPendingEvaluations(userId: string) {
        const { data: evaluations, error } = await supabase
            .from('evaluations')
            .select(`
        *,
        evaluated:profiles!evaluated_id(*),
        evaluator:profiles!evaluator_id(*)
      `)
            .eq('evaluator_id', userId)
            .eq('status', 'pending');

        if (error) throw error;
        return evaluations;
    },

    async getDefaultTemplate(): Promise<Template> {
        const { data, error } = await supabase
            .from('evaluation_templates')
            .select('*')
            .eq('is_default', true)
            .single();

        if (error) throw error;
        return data;
    },

    async saveEvaluation(evaluationId: string | undefined, formData: any) {
        if (evaluationId) {
            const { data, error } = await supabase
                .from('evaluations')
                .update(formData)
                .eq('id', evaluationId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } else {
            const { data, error } = await supabase
                .from('evaluations')
                .insert(formData)
                .select()
                .single();

            if (error) throw error;
            return data;
        }
    }
};
