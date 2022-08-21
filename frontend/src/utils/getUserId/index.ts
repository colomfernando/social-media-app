import getCookie from 'utils/getCookie';
import { TokenDecode } from 'types';
import jwtDecode from 'jwt-decode';

const getUserId = (): string | null => {
  const token: null | string = getCookie('auth-token');
  if (!token) return null;

  const tokenDecode = jwtDecode<TokenDecode>(token);
  if (!tokenDecode) return null;

  const { id } = tokenDecode;
  return id;
};

export default getUserId;
