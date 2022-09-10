import getCookie from 'utils/getCookie';
import { TokenDecode } from 'types';
import jwtDecode from 'jwt-decode';

const getUserId = (): string => {
  const token: null | string = getCookie('auth-token');
  if (!token) return '';

  const tokenDecode = jwtDecode<TokenDecode>(token);
  if (!tokenDecode) return '';

  const { id } = tokenDecode;
  return id || '';
};

export default getUserId;
