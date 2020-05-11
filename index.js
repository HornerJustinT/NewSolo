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
import { act } from 'react-test-renderer';


const getUserReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CURRENT_USER":
      console.log("in user reducer payload", action.payload);
      return action.payload;
    default:
      return state;
  }
};
const getRunHistory = (state = [], action) => {

  switch(action.type){
    case 'GET_RUN_HISTORY':
      console.log('in get run history reducer payload', action.payload)
      return action.payload;
    default: 
      return state;
  }
};
const getCurrentRunID = (state=[], action) => {

  switch (action.type) {
    case 'GET_CURRENT_RUN_ID':
      console.log('in Get Current Run ID', action.payload)
      return action.payload;
    default:
      return state;
  }
}
const editRunInfo = (state=[], action) => {
  switch (action.type){
    case 'EDIT_RUN_INFO':
      console.log( 'in edit run info', action.payload)
      return action.payload;
    default:
      return state;
  }
}
function* rootSaga(){
    // yield takeEvery('SET_USERS', getUserSaga);
    yield takeEvery('CHECK_LOGIN', checkLoginSaga);
    yield takeEvery('ADD_USER',addUserSaga);
    yield takeEvery('GET_USER_RUNS', getUserRunsSaga)
    yield takeEvery('EDIT_CURRENT_RUN', editCurrentRunSaga)
    yield takeEvery('EDIT_RUN', editRunSaga)
    yield takeEvery('ADD_RUN', addRunSaga)
    yield takeEvery('DELETE_RUN', deleteRunSaga)
}
function* deleteRunSaga(action){
  console.log('in delete run', action.payload)
  try{
    const response = yield axios.delete(`http://192.168.0.79:5000/api/run/${action.payload.currentRun}`)
    console.log('delete run response', response.data)
  }
  catch(error){
    console.log('error delete run', error)
  }
  yield put ({type: 'GET_USER_RUNS', payload: action.payload.runnerId[0].id})
}
function* addRunSaga(action){
  console.log('in add run', action.payload)
  try{
    const response = yield axios.post(`http://192.168.0.79:5000/api/run`, action.payload)
    console.log('add saga', response.data);
  }
  catch(error){
    console.log('Error with edit put', error);
  }
  yield put ({type: 'GET_USER_RUNS', payload: action.payload.runnerId})
}
function* editRunSaga(action){
  console.log('in edit run', action.payload)
  try{
    const response = yield axios.put(`http://192.168.0.79:5000/api/run/${action.payload.currentRun}`, action.payload)
    console.log('edit saga', response.data);
  }
  catch(error){
    console.log('Error with edit put', error);
  }
  yield put ({type: 'GET_USER_RUNS', payload: action.payload.runnerId[0].id})
}
function* editCurrentRunSaga(action){
  console.log('in editCurrentRunSaga', action.payload)
  yield put({type: 'GET_CURRENT_RUN_ID', payload: action.payload})
}
function* addUserSaga(action){
  console.log('in addUserSaga', action.payload);
  try{
    yield axios.put(`http://192.168.0.79:5000/api/user/${action.payload}`)
    const response = yield axios.get(`http://192.168.0.79:5000/api/user/${action.payload}`);
    console.log('Add User saga', response.data[0].id);
    yield put({type: 'GET_CURRENT_USER', payload: response.data})
  }
  catch(error){
    console.log('Error with Search Get', error);
  }
}
function* getUserRunsSaga(action){
  console.log('in getuserrunssaga', action.payload);
  try{
    console.log(`http://192.168.0.79:5000/api/run/${action.payload}`)
    const response = yield axios.get(`http://192.168.0.79:5000/api/run/${action.payload}`);
    console.log("get user runs response", response.data)
    yield put ({type: 'GET_RUN_HISTORY', payload: response.data})
  }
  catch(error){
    console.log('Error with get user Runs get')
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
    else{
      yield put({type: 'GET_CURRENT_USER', payload: response.data})
    }


  }
  catch(error){
    console.log('Error with check get')
  }
}
let store = createStore(combineReducers({ getUserReducer, getRunHistory, getCurrentRunID }),applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
class MyApp extends React.Component {
  render() {
    return <Provider store={store}><App /></Provider>;
  }
}
export {store,}

AppRegistry.registerComponent(appName, () => MyApp);
