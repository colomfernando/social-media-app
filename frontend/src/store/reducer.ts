import { Actions, State } from './types';
import actionTypes from './actionTypes';

const initialState = {
  user: null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default reducer;
