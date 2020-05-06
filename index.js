/**
 * @format
 */

import React from 'react'
import { AppRegistry } from "react-native";
import App from "./components/app/App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from 'redux-saga'
import {takeEvery, put} from 'redux-saga/effects';
const sagaMiddleware = createSagaMiddleware();
import {name as appName} from './components/app/app.json';
import axios from 'axios';


const getUserReducer = (state = [], action) => {
  console.log("in user reducer payload", action.payload);
  switch (action.type) {
    case "GET_CURRENT_USER":
      return action.payload;
    default:
      return state;
  }
};
const getRunHistory = (state = [], action) => {
  console.log('in get run history reducer payload', action.payload)
  switch(action.type){
    case 'GET_RUN_HISTORY':
      return action.payload;
    default: 
      return state;
  }
};
function* rootSaga(){
    // yield takeEvery('SET_USERS', getUserSaga);
    yield takeEvery('CHECK_LOGIN', checkLoginSaga);
    yield takeEvery('ADD_USER',addUserSaga);
    yield takeEvery('GET_USER_RUNS', getUserRunsSaga)
}
function* addUserSaga(action){
  console.log('in addUserSaga', action.payload);
  try{
    const response = yield axios.put(`http://192.168.0.79:5000/api/user/${action.payload}`)
    console.log(response.data);
  }
  catch(error){
    console.log('Error with Search Get', error);
  }
}
function* getUserRunsSaga(action){
  console.log('in getuserrunssaga', action.payload);
  try{
    const response = yield axios.get(`http://192.168.0.79:5000/api/run/${action.payload}`);
    console.log("get user runs response", response.data)
    yield put ({type: 'GET_RUN_HISTORY', payload: response.data})
  }
  catch(error){
    console.log('Error with check get')
  }
}

function* checkLoginSaga(action){
  console.log('in checkUserSaga', action.payload);
  try{
    const response = yield axios.get(`http://192.168.0.79:5000/api/user/${action.payload}`);
    console.log('check log in', response.data)
    if(response.data.length==0){
      yield put ({type: 'ADD_USER', payload: action.payload})
    }
    yield put({type: 'GET_CURRENT_USER', payload: response.data})

  }
  catch(error){
    console.log('Error with check get')
  }
}
let store = createStore(combineReducers({ getUserReducer, getRunHistory }),applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
class MyApp extends React.Component {
  render() {
    return <Provider store={store}><App /></Provider>;
  }
}
export {store,}

AppRegistry.registerComponent(appName, () => MyApp);
