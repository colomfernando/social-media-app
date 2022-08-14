import getCookie from 'utils/getCookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';

interface TokenDecode extends JwtPayload {
  email: string;
  firstname: string;
  id: string;
  username: string;
}

const isUserLogged = (): boolean => {
  const token: null | string = getCookie('auth-token');

  if (!token) return false;

  const tokenDecode = jwtDecode<TokenDecode>(token);

  if (tokenDecode && tokenDecode.id) return true;

  return false;
};

export default isUserLogged;
