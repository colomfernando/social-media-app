import getCookie from 'utils/getCookie';
import setCookie from 'utils/setCookie';
import { TokenDecode } from 'types';
import jwtDecode from 'jwt-decode';

const isUserLogged = (): boolean => {
  const token: null | string = getCookie('auth-token');

  if (!token) return false;

  const tokenDecode = jwtDecode<TokenDecode>(token);
  if (!tokenDecode || !tokenDecode.id || !tokenDecode.exp) return false;

  const isExpired = tokenDecode.exp * 1000 < Date.now();
  if (isExpired) {
    setCookie('auth-token', '');
    return false;
  }

  return true;
};

export default isUserLogged;
