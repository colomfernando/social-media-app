import React from 'react';
import Header from 'components/Header';

const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
