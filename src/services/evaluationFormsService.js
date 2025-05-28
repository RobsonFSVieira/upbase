import { supabase } from './supabase';
import { auditLogService } from './auditLogService';

export const evaluationFormsService = {
    async createFormTemplate(template) {
        try {
            const { data, error } = await supabase
                .from('evaluation_form_templates')
                .insert([{
                    title: template.title,
                    description: template.description,
                    sections: template.sections,
                    status: 'draft',
                    created_by: template.userId,
                    created_at: new Date().toISOString()
                }]);

            if (error) throw error;

            await auditLogService.logChange({
                entityType: 'evaluation_form_template',
                entityId: data[0].id,
                action: 'create',
                userId: template.userId,
                changes: template,
                newStatus: 'draft'
            });

            return data[0];
        } catch (error) {
            console.error('Error creating form template:', error);
            throw error;
        }
    },

    async updateFormTemplate(id, template) {
        try {
            const { data: oldTemplate } = await supabase
                .from('evaluation_form_templates')
                .select('*')
                .eq('id', id)
                .single();

            const { data, error } = await supabase
                .from('evaluation_form_templates')
                .update({
                    title: template.title,
                    description: template.description,
                    sections: template.sections,
                    updated_at: new Date().toISOString(),
                    updated_by: template.userId
                })
                .eq('id', id)
                .select();

            if (error) throw error;

            await auditLogService.logChange({
                entityType: 'evaluation_form_template',
                entityId: id,
                action: 'update',
                userId: template.userId,
                changes: {
                    old: oldTemplate,
                    new: template
                }
            });

            return data[0];
        } catch (error) {
            console.error('Error updating form template:', error);
            throw error;
        }
    },

    async getFormTemplates() {
        try {
            const { data, error } = await supabase
                .from('evaluation_form_templates')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching form templates:', error);
            throw error;
        }
    },

    async changeFormStatus(id, newStatus, userId) {
        try {
            const { data: oldData } = await supabase
                .from('evaluation_form_templates')
                .select('status')
                .eq('id', id)
                .single();

            const { data, error } = await supabase
                .from('evaluation_form_templates')
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString(),
                    updated_by: userId
                })
                .eq('id', id)
                .select();

            if (error) throw error;

            await auditLogService.logChange({
                entityType: 'evaluation_form_template',
                entityId: id,
                action: 'status_change',
                userId,
                previousStatus: oldData.status,
                newStatus
            });

            return data[0];
        } catch (error) {
            console.error('Error changing form status:', error);
            throw error;
        }
    }
};
