import { createElement } from 'react';
import { Typography, Box } from '@mui/material';

const createHelpContent = (title, sections) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>{title}</Typography>
      {sections.map((section, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          {typeof section === 'string' ? (
            <Typography paragraph>{section}</Typography>
          ) : (
            section
          )}
        </Box>
      ))}
    </>
  );
};

export const helpContent = {
  '/': createHelpContent('Dashboard', [
    'O Dashboard oferece uma visão geral do sistema, exibindo:',
    '• Avaliações pendentes e urgentes',
    '• Últimos resultados de avaliações',
    '• Feedbacks recentes',
  ]),

  '/avaliacoes': createHelpContent('Avaliações', [
    'Na seção de avaliações você pode:',
    '• Visualizar e criar novas avaliações',
    '• Acompanhar o progresso das avaliações em andamento',
    '• Gerenciar modelos de avaliação',
  ]),

  '/avaliacoes/desempenho': createHelpContent('Avaliações de Desempenho', [
    'Aqui você pode gerenciar avaliações de desempenho:',
    '• Ver o status das avaliações pendentes',
    '• Criar novas avaliações',
    '• Acompanhar o progresso',
    '• Configurar modelos de avaliação',
  ]),

  '/colaboradores': createHelpContent('Colaboradores', [
    'Gerencie informações dos colaboradores:',
    '• Lista completa de colaboradores',
    '• Filtros por turno e status',
    '• Detalhes individuais',
    '• Histórico de avaliações',
  ]),

  '/atestados': createHelpContent('Atestados', [
    'Gerencie os atestados médicos:',
    '• Visualize todos os atestados registrados',
    '• Filtre por nome, RE ou CID',
    '• Consulte detalhes como turno e descrição do CID',
  ]),

  '/profile': createHelpContent('Meu Perfil', [
    'Gerencie suas informações pessoais:',
    '• Visualize seus dados cadastrais',
    '• Solicite alterações em seu perfil',
    '• Acompanhe solicitações pendentes',
  ]),

  '/settings': createHelpContent('Configurações', [
    'Personalize sua experiência:',
    '• Altere entre tema claro e escuro',
    '• Configure notificações do sistema',
    '• Configure notificações por email',
  ]),

  '/avaliacoes/experiencia': createHelpContent('Avaliações de Experiência', [
    'Gerencie avaliações do período de experiência:',
    '• Crie novas avaliações',
    '• Acompanhe avaliações em andamento',
    '• Visualize histórico de avaliações',
  ]),
};
