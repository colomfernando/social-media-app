import React from 'react';
import SocialIcon from 'components/SocialIcon';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from 'components/LogoutIcon';
import { Link } from 'react-router-dom';
import setCookie from 'utils/setCookie';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { actionWipeUser } from 'store/actions';
import InputSearch from 'components/InputSearch';
import { State } from 'store/types';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  console.log('user :>> ', user);
  const handleLogout = () => {
    dispatch(actionWipeUser());
    setCookie('auth-token', '');
    navigate('/', { replace: true });
  };
  return (
    <header className="w-100 px-4 py-4 sticky top-0 bg-gray-100 flex justify-between align-center">
      <Link to="/dashboard" className="flex items-center">
        <SocialIcon />
        <h3 className="font-bold ml-3">{`@${user?.username}`}</h3>
      </Link>
      <InputSearch />
      <Button variant="outlined" onClick={handleLogout}>
        <LogoutIcon />
        Logout
      </Button>
    </header>
  );
};

export default Header;
