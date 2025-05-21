import { useState, useCallback } from 'react';
import { useNotification } from '../../../contexts/NotificationContext';

export function useAvaliacao() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  const salvarAvaliacao = useCallback(async (dados) => {
    try {
      setLoading(true);
      // TODO: Implementar integração com backend
      showNotification({
        message: 'Avaliação salva com sucesso!',
        type: 'success'
      });
      return true;
    } catch (err) {
      setError(err.message);
      showNotification({
        message: 'Erro ao salvar avaliação',
        type: 'error'
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  return {
    loading,
    error,
    salvarAvaliacao
  };
}
