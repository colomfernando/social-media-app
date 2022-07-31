import React from 'react';
import SocialIcon from 'components/SocialIcon';

const Header: React.FC = () => {
  return (
    <header className="w-100 px-4 py-4 sticky top-0 bg-gray-100">
      <SocialIcon />
    </header>
  );
};

export default Header;
