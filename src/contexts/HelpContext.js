import React, { createContext, useContext, useState } from 'react';

const HelpContext = createContext();

export function HelpProvider({ children }) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpTitle, setHelpTitle] = useState('');
  const [helpContent, setHelpContent] = useState('');

  const showHelp = (title, content) => {
    setHelpTitle(title);
    setHelpContent(content);
    setHelpOpen(true);
  };

  const hideHelp = () => {
    setHelpOpen(false);
  };

  return (
    <HelpContext.Provider value={{ showHelp, hideHelp, helpOpen, helpTitle, helpContent }}>
      {children}
    </HelpContext.Provider>
  );
}

export const useHelp = () => {
  const context = useContext(HelpContext);
  if (!context) {
    throw new Error('useHelp must be used within a HelpProvider');
  }
  return context;
};
