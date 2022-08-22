import getCookie from 'utils/getCookie';
import { TokenDecode } from 'types';
import jwtDecode from 'jwt-decode';

const getUserIdFromCookie = (tokenValue?: string): string | null => {
  const token: null | string = tokenValue || getCookie('auth-token');
  if (!token) return null;

  const tokenDecode = jwtDecode<TokenDecode>(token);

  if (!tokenDecode || !tokenDecode.id) return null;

  return tokenDecode.id;
};
export default getUserIdFromCookie;
