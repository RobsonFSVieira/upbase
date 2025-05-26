// Simulação de um serviço de autenticação
const mockUsers = [
  {
    id: 'leader123',
    email: 'joao.silva@grupocesari.com.br',
    name: 'João Silva',
    matricula: 'L001',
    turno: 'A',
    role: 'lider',
    status: 'active',
    createdAt: new Date('2023-01-01')
  },
  {
    id: 'user456',
    email: 'maria.oliveira@grupocesari.com.br',
    name: 'Maria Oliveira',
    matricula: 'C001',
    turno: 'B',
    role: 'colaborador',
    status: 'active',
    createdAt: new Date('2023-02-01')
  },
  {
    id: 'user789',
    email: 'carlos.santos@grupocesari.com.br',
    name: 'Carlos Santos',
    matricula: 'C002',
    turno: 'A',
    role: 'colaborador',
    status: 'active',
    createdAt: new Date('2023-03-01')
  }
];

export const register = async (userData) => {
  try {
    // Simula validações
    if (!userData.emailPrefix || !userData.password || !userData.name || !userData.matricula || !userData.turno) {
      throw new Error('Todos os campos são obrigatórios');
    }

    // Constrói o email completo
    const email = `${userData.emailPrefix}@grupocesari.com.br`;

    // Verifica se o usuário já existe
    if (mockUsers.find(user => user.email === email)) {
      throw new Error('Usuário já cadastrado');
    }

    // Cria o novo usuário
    const newUser = {
      id: `user${Date.now()}`,
      email,
      name: userData.name,
      matricula: userData.matricula,
      turno: userData.turno,
      role: 'colaborador',
      status: 'pending', // aguardando aprovação
      createdAt: new Date()
    };

    mockUsers.push(newUser);
    
    return {
      success: true,
      message: 'Cadastro realizado com sucesso! Aguardando aprovação.',
      user: newUser
    };
  } catch (error) {
    throw new Error(error.message || 'Erro ao realizar cadastro');
  }
};

export const login = async (emailPrefix, password) => {
  try {
    const email = `${emailPrefix}@grupocesari.com.br`;
    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (user.status === 'pending') {
      throw new Error('Cadastro aguardando aprovação do administrador');
    }

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        turno: user.turno,
        matricula: user.matricula
      }
    };
  } catch (error) {
    throw new Error(error.message || 'Erro ao realizar login');
  }
};

export const logout = async () => {
  // Em um cenário real, aqui seria feita a invalidação do token, etc.
  return { success: true };
};

export const checkRegistrationStatus = async (userId) => {
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return {
    status: user.status,
    message: user.status === 'pending' 
      ? 'Seu cadastro está aguardando aprovação.' 
      : 'Seu cadastro já foi aprovado.'
  };
};
