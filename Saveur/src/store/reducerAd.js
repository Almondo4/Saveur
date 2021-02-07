import moment from 'moment';
const initialState = {
    tables: [],
    menu: [],
    events: [],
    eventsId: [],
    users: [],
    coupons: [],
    exceptions: [],
    exceptDays:[],
    // workingHours:'08:00 AM - 10:00 PM',
    address:'22 Royal Street, Les Combattants Avenue, Constantine',
    phone:'+213 25 187 678',
    openingDay:'',
    closingDay:'',
    openninghour:'',
    closingHour:'',

};
const reducerAD = (state = initialState, action) => {

    switch (action.type) {
        //RestaurantInfo:
        case'INFO_ADDRESS': {
            if (action.payload) {
                return {
                    ...state,
                    address: action.payload
                }
            } else {
                return {
                    ...state
                }
            }

        }
        case'INFO_PHONE': {
            if (action.payload) {
                console.log(action.payload);
                return {
                    ...state,
                    phone: action.payload
                }
            } else {
                return {
                    ...state
                }
            }

        }
        //Users
        case'STORE_USERS': {
            return {
                ...state,
                users: action.payload || []
            }
        }
        case'USERS_FAIL': {
            return {
                ...state,
            }
        }
        //    Tables
        case'STORE_TABLES': {
            return {
                ...state,
                tables: action.payload || []
            }
        }
        case'TABLES_FAIL': {
            return {
                ...state,
            }
        }
        //    Events
        case'STORE_EVENTS': {
            return {
                ...state,
                events: action.payload || []
            }
        }
        case'EVENTS_FAIL': {
            return {
                ...state,

            }
        }
        // case'STORE_EVENTSID':{
        //     let evID=[];
        //     for (let e in this.state.events) evID= this.state.eventsId.push(e.id);
        //
        //     return{
        //         ...state,
        //         eventsId:evID
        //     }
        //
        // }
        //    ModMenu
        case'STORE_MENU': {
            return {
                ...state,
                menu: state.menu.concat(action.payload)
            }
        }
        case'MENU_FAIL': {
            return {
                ...state,
            }
        }
        //    Coupons
        case'STORE_COUPONS': {
            return {
                ...state,
                coupons: action.payload || []
            }
        }
        case'COUPONS_FAIL': {
            return {
                ...state,
            }
        }
        //    Schedule
        case'STORE_SCHEDULE': {
            return {
                ...state,
                openingDay:action.payload.opening_day,
                closingDay:action.payload.closing_day,
                openninghour:action.payload.opening_time,
                closingHour:action.payload.closing_time,
            }
        }
        case'SCHEDULE_FAIL': {
            return {
                ...state,
            }
        }
        case'STORE_EXCEPT': {
            // let days=action.payload
            // console.log( days);
            // for (let i = 0; i < action.payload.length; i++) {
            //     console.log(action.payload[i]);
            //
            //         for(let x=0;x<action.payload[i].duration;x++){
            //
            //             days.push( moment(action.payload[i].exception_date, "DD-MM-YYYY").add(x, 'days'));
            //
            //         }
            // }
            // console.log(days)
            // for(let e in days){
            //     console.log('here '+e.id );
            //     days.push(e.exception_date)
            //     for(let x=1;x<=e.exception_date;x++){
            //
            //         days.push( moment(e.exception_date, "DD-MM-YYYY").add(x, 'days'));
            //         console.log(days)
            //     }
            // }
            // console.log( action.payload);
            return{
                ...state,

                exceptions:action.payload ||[]
            }
        }
        case'STORE_EXCEPT_DATES':{
            return{
                ...state,
                exceptDays:action.payload,
            }
        }
        default:
            return {...state}

    }


};
export default reducerAD;