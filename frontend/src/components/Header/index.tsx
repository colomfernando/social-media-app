import React from 'react';
import SocialIcon from 'components/SocialIcon';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from 'components/LogoutIcon';
import setCookie from 'utils/setCookie';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setCookie('auth-token', '');
    navigate('/', { replace: true });
  };
  return (
    <header className="w-100 px-4 py-4 sticky top-0 bg-gray-100 flex justify-between align-center">
      <SocialIcon />
      <button
        type="button"
        className="py-2.5 px-5  text-sm font-medium text-white bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800  dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        onClick={handleLogout}
      >
        <LogoutIcon />
        Logout
      </button>
    </header>
  );
};

export default Header;
