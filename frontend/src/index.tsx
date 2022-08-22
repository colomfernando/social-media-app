import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import redux from './store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={redux.store}>
      <PersistGate persistor={redux.persistor}>
        <App />
        <ToastContainer
          position="top-center"
          hideProgressBar
          autoClose={1000}
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
