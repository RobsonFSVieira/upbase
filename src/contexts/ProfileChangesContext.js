import React, { createContext, useContext, useState } from 'react';

const ProfileChangesContext = createContext();

export const ProfileChangesProvider = ({ children }) => {
  const [pendingChanges, setPendingChanges] = useState([]);
  
  const requestChange = (userId, changes) => {
    const newRequest = {
      id: Date.now(),
      userId,
      changes,
      status: 'pending',
      requestedAt: new Date(),
      approvedAt: null,
      approvedBy: null
    };
    
    setPendingChanges(prev => [...prev, newRequest]);
    // Aqui enviaria notificação para o líder
  };

  const approveChange = (requestId, leaderId) => {
    setPendingChanges(prev =>
      prev.map(request =>
        request.id === requestId
          ? {
              ...request,
              status: 'approved',
              approvedAt: new Date(),
              approvedBy: leaderId
            }
          : request
      )
    );
    // Aqui aplicaria as mudanças e notificaria o usuário
  };

  return (
    <ProfileChangesContext.Provider
      value={{
        pendingChanges,
        requestChange,
        approveChange
      }}
    >
      {children}
    </ProfileChangesContext.Provider>
  );
};

export const useProfileChanges = () => useContext(ProfileChangesContext);
