import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import notesReducer from '../reducers/noteReducer';


export default combineReducers({
    auth: authReducer,
    notes: notesReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
}) 