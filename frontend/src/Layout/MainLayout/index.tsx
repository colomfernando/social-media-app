import React, { ReactNode } from 'react';
import Header from 'components/Header';

interface PropsMainLayout {
  children: ReactNode;
}
const MainLayout: React.FC<PropsMainLayout> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
