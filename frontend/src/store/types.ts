import { User } from 'types';

export interface State {
  user: null | User;
}

export interface Action<P> {
  type: string;
  payload: P;
}

export type Actions = Action<User>;
