
import {combineReducers}from 'redux';
// import Freducer from"./formReducer";
import reducer from "./Reducer";

import reducerAd from "./reducerAd";
import reducerSv from "./reducerSv";
import reducerCl from "./reducerCl";

/* import {reducer as formReducer}from "redux-form";*/




export default combineReducers({

    main:reducer,
    Sv:reducerSv,
    Cl:reducerCl,
    Ad:reducerAd,

})