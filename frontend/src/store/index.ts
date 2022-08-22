import { createStore, applyMiddleware, Store, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { State, Actions } from './types';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store: Store<State, Actions> = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default { store, persistor: persistStore(store) };
