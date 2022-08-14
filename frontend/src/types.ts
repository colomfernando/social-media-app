export interface ValuesFormLogin {
  email: string;
  password: string;
}

export interface ValuesFormRegister {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface ErrorApi extends Error {
  code: number;
  message: string;
}

export interface Post {
  text: string;
  id: number;
  likes: number;
  timestamp: number;
  user: {
    id: number;
    avatar: string;
    firstname: string;
    lastname: string;
    username: string;
  };
}