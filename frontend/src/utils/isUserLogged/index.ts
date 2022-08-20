import getCookie from 'utils/getCookie';
import { TokenDecode } from 'types';
import jwtDecode from 'jwt-decode';

const isUserLogged = (): boolean => {
  const token: null | string = getCookie('auth-token');

  if (!token) return false;

  const tokenDecode = jwtDecode<TokenDecode>(token);

  if (tokenDecode && tokenDecode.id) return true;

  return false;
};

export default isUserLogged;
