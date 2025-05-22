import React, { createContext, useContext, useState } from 'react';

const FormsContext = createContext();

export const FormsProvider = ({ children }) => {
  const [forms, setForms] = useState({
    drafts: [], // Modelos em rascunho
    approved: [], // Modelos aprovados
    active: [] // Modelos em uso
  });

  const moveForm = (formId, fromStatus, toStatus) => {
    setForms(prev => {
      const form = prev[fromStatus].find(f => f.id === formId);
      if (!form) return prev;

      return {
        ...prev,
        [fromStatus]: prev[fromStatus].filter(f => f.id !== formId),
        [toStatus]: [...prev[toStatus], { ...form, status: toStatus }]
      };
    });
  };

  const updateFormStatus = (formId, fromStatus, newStatus) => {
    setForms(prev => {
      const form = prev[fromStatus].find(f => f.id === formId);
      if (!form) return prev;

      return {
        ...prev,
        [fromStatus]: prev[fromStatus].map(f => 
          f.id === formId ? { ...f, status: newStatus } : f
        )
      };
    });
  };

  const cloneForm = (formId, status) => {
    setForms(prev => {
      const formToClone = prev[status].find(f => f.id === formId);
      if (!formToClone) return prev;

      const clonedForm = {
        ...formToClone,
        id: Date.now(),
        title: `${formToClone.title} (Cópia)`,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return {
        ...prev,
        drafts: [...prev.drafts, clonedForm]
      };
    });
  };

  return (
    <FormsContext.Provider value={{ 
      forms, 
      setForms, 
      moveForm, 
      updateFormStatus,
      cloneForm 
    }}>
      {children}
    </FormsContext.Provider>
  );
};

export const useForms = () => useContext(FormsContext);
