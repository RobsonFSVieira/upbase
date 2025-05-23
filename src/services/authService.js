// Simulação de um serviço de autenticação
const mockUsers = [];

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
      id: Date.now(),
      email,
      name: userData.name,
      matricula: userData.matricula,
      turno: userData.turno,
      role: 'colaborador',
      status: 'pending', // aguardando aprovação
      createdAt: new Date()
    };

    mockUsers.push(newUser);

    // Em um cenário real, isso seria salvo no backend
    localStorage.setItem('pending_registration', JSON.stringify(newUser));

    return {
      success: true,
      message: 'Cadastro realizado com sucesso! Aguardando aprovação.',
      user: newUser
    };
  } catch (error) {
    throw new Error(error.message || 'Erro ao realizar cadastro');
  }
};

export const login = async (credentials) => {
  // Implementação do login
  // ...
};

export const logout = async () => {
  // Implementação do logout
  // ...
};

export const checkRegistrationStatus = async (userId) => {
  // Implementação da verificação de status do registro
  // ...
};
