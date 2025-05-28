import { supabase } from './supabase';
import { auditLogService } from './auditLogService';

export const evaluationsService = {
    async createEvaluation(evaluation) {
        try {
            const { data, error } = await supabase
                .from('evaluations')
                .insert([{
                    template_id: evaluation.templateId,
                    evaluator_id: evaluation.evaluatorId,
                    evaluatee_id: evaluation.evaluateeId,
                    due_date: evaluation.dueDate,
                    status: 'pending',
                    created_at: new Date().toISOString()
                }]);

            if (error) throw error;

            await auditLogService.logChange({
                entityType: 'evaluation',
                entityId: data[0].id,
                action: 'create',
                userId: evaluation.evaluatorId,
                changes: evaluation,
                newStatus: 'pending'
            });

            return data[0];
        } catch (error) {
            console.error('Error creating evaluation:', error);
            throw error;
        }
    },

    async submitEvaluation(id, responses, userId) {
        try {
            const { data, error } = await supabase
                .from('evaluations')
                .update({
                    responses,
                    status: 'completed',
                    completed_at: new Date().toISOString(),
                    completed_by: userId
                })
                .eq('id', id)
                .select();

            if (error) throw error;

            await auditLogService.logChange({
                entityType: 'evaluation',
                entityId: id,
                action: 'submit',
                userId,
                previousStatus: 'pending',
                newStatus: 'completed'
            });

            return data[0];
        } catch (error) {
            console.error('Error submitting evaluation:', error);
            throw error;
        }
    },

    async getPendingEvaluations(userId) {
        try {
            const { data, error } = await supabase
                .from('evaluations')
                .select(`
          *,
          template:template_id(title, description),
          evaluatee:evaluatee_id(name, email)
        `)
                .eq('evaluator_id', userId)
                .eq('status', 'pending')
                .order('due_date', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching pending evaluations:', error);
            throw error;
        }
    },

    async getEvaluationHistory(userId) {
        try {
            const { data, error } = await supabase
                .from('evaluations')
                .select(`
          *,
          template:template_id(title, description),
          evaluator:evaluator_id(name, email),
          evaluatee:evaluatee_id(name, email)
        `)
                .or(`evaluator_id.eq.${userId},evaluatee_id.eq.${userId}`)
                .eq('status', 'completed')
                .order('completed_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching evaluation history:', error);
            throw error;
        }
    },

    async getEvaluationStats(userId) {
        try {
            // Get counts for different evaluation statuses
            const { data: counts, error: countsError } = await supabase
                .from('evaluations')
                .select('status, count(*)', { count: 'exact' })
                .or(`evaluator_id.eq.${userId},evaluatee_id.eq.${userId}`)
                .group('status');

            if (countsError) throw countsError;

            // Get recent evaluations
            const { data: recent, error: recentError } = await supabase
                .from('evaluations')
                .select(`
          *,
          template:template_id(title),
          evaluator:evaluator_id(name),
          evaluatee:evaluatee_id(name)
        `)
                .or(`evaluator_id.eq.${userId},evaluatee_id.eq.${userId}`)
                .order('created_at', { ascending: false })
                .limit(5);

            if (recentError) throw recentError;

            return {
                counts: counts.reduce((acc, curr) => ({
                    ...acc,
                    [curr.status]: curr.count
                }), {}),
                recent
            };
        } catch (error) {
            console.error('Error fetching evaluation stats:', error);
            throw error;
        }
    }
};
