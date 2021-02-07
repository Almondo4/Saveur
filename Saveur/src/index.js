import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//redux-store
import {createStore,applyMiddleware}from 'redux';
import reducer from './store/Rindex';
import {Provider}from 'react-redux';
//forAsyncActions
// import {createLogger} from "redux-logger";//console logs of prev,action.nextState store=>return next=action=>return action;

// Redux Thunk middleware allows you to write action creators that return a function instead of an action.
// The thunk can be used to delay the dispatch of an action,
// or to dispatch only if a certain condition is met.
// The inner function receives the store methods dispatch and getState as parameters.
//in the middleware in the last function return the thunk blocks it and dispatch it again in the future. thunk is able to wait for result.
import thunk from"redux-thunk"

const logger=store=>{

    return next=>{
        return action=>{

            console.log('dispatching',action);
            const result=next(action);
            console.log('next state',store.getState());
            return result
        }
    }
}
//createLogger({collapsed:true})
const middleWare=applyMiddleware(thunk,logger);

const  store=createStore(reducer,middleWare);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
