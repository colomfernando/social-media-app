import actionTypes from './actionTypes';
import { User } from 'types';

export const actionSetUser = (payload: User) => ({
  type: actionTypes.SET_USER,
  payload,
});
