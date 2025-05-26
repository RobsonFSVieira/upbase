import React, { createContext, useContext, useState, useEffect } from 'react';

// Dados mockados para teste
const mockUsers = [
  {
    id: '1',
    email: 'admin@lider.com',
    name: 'Admin',
    role: 'lider',
    turno: 'A'
  },
  {
    id: '2',
    email: 'joao@colaborador.com',
    name: 'João Silva',
    role: 'colaborador',
    turno: 'A'
  },
  // Adicione mais usuários conforme necessário
];

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingApproval, setPendingApproval] = useState(false);

  useEffect(() => {
    // Verifica se há usuário salvo no localStorage
    const savedUser = localStorage.getItem('upbase_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    // Simula registro de usuário
    const newUser = {
      ...userData,
      status: 'pending', // pending, approved, rejected
      createdAt: new Date()
    };
    
    // Em produção, enviaria para a API
    localStorage.setItem('pending_user', JSON.stringify(newUser));
    setPendingApproval(true);
    
    return newUser;
  };

  const login = async (email, password) => {
    try {
      // Buscar usuário mockado
      const mockUser = mockUsers.find(u => u.email === email) || {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        role: email.includes('lider') ? 'lider' : 'colaborador',
        turno: 'A',
        status: 'approved' // Para teste, considere todos aprovados
      };

      // Simular verificação de status
      if (mockUser.status === 'pending') {
        throw new Error('Conta aguardando aprovação do administrador');
      }

      setUser(mockUser);
      localStorage.setItem('upbase_user', JSON.stringify(mockUser));
      return mockUser;
    } catch (error) {
      throw new Error(error.message || 'Erro ao realizar login');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('upbase_user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    pendingApproval,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
