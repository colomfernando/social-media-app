import React from 'react';
import SocialIcon from 'components/SocialIcon';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from 'components/LogoutIcon';
import { Link } from 'react-router-dom';
import setCookie from 'utils/setCookie';
import Button from 'components/Button';
import { useDispatch } from 'react-redux';
import { actionWipeUser } from 'store/actions';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actionWipeUser());
    setCookie('auth-token', '');
    navigate('/', { replace: true });
  };
  return (
    <header className="w-100 px-4 py-4 sticky top-0 bg-gray-100 flex justify-between align-center">
      <Link to="/dashboard">
        <SocialIcon />
      </Link>
      <Button onClick={handleLogout}>
        <LogoutIcon />
        Logout
      </Button>
    </header>
  );
};

export default Header;
