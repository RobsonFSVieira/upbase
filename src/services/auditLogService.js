import { supabase } from './supabase';

export const auditLogService = {
  async logChange({ 
    entityType, 
    entityId, 
    action, 
    userId, 
    changes, 
    previousStatus, 
    newStatus 
  }) {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .insert([{
          entity_type: entityType,
          entity_id: entityId,
          action,
          user_id: userId,
          changes,
          previous_status: previousStatus,
          new_status: newStatus
        }]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao registrar log:', error);
      // Em produção, você pode querer notificar um serviço de monitoramento
    }
  }
};
