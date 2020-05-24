import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Loader } from './Components/Loader/Loader';

import firebase from 'firebase/app';
import myFirebase from '../src/Firebase/Firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

const config = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rrrfProps = {
  firebase,
  config: myFirebase,
  config,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div className='loader-div'><Loader /></div>
  return children;
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrrfProps}>
        <BrowserRouter>
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

