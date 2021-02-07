import axios from "axios";

//Tables

const storeTables = users => {

    return {
        type: "STORE_TABLES",
        payload: users,

    }
};

const failedTables = err => {

    return {
        type: 'TABLES_FAIL',
        payload: err,
    }
};

export const getTables= (api) => {

    return dispatch => {

        axios.get("http://lumen.test/api/v1/tables/retrieve?api_token="+api).then(response => {

                dispatch(storeTables(response.data))
            }
        ).catch(err => {
            dispatch(failedTables(err.data))
        })
    }

};

export const deleteTable=(id)=>{
    return ()=>{
        axios.delete("http://lumen.test/api/v1/tables/delete/"+id.idT+
            "?api_token="+id.api_token)
            .then(res=>{
                window.alert(res.data)
            })
    }
}

export const changeTable=(info)=>{

    return ()=>{
        axios.post("http://lumen.test/api/v1/tables/createEdit",info)
            .then(res=>{
                console.log(res.data)
            })
    }
}

//ModMenu


const storeMenu = users => {

    return {
        type: "STORE_MENU",
        payload: users,

    }
};

// const failedMenu = err => {
//
//     return {
//         type: 'MENU_FAIL',
//         payload: err,
//     }
// };

export const createEditMenu=(info)=>{
    console.log(info);
    return dispatch=>{

        axios.post("http://lumen.test/api/v1/products/createEdit",info)
            .then(res=>{
                    console.log(res);
                }

            )
    }
};
export const deleteDish=(id)=>{
    return ()=>{
        axios.delete("http://lumen.test/api/v1/products/delete/"+id.idT+
            "?api_token="+id.api_token)
            .then(res=>{
                window.alert(res.data)
            })
    }
}
//Users

const storeUsers = users => {

    return {
        type: "STORE_USERS",
        payload: users,

    }
};

const failedUsers = err => {

    return {
        type: 'USERS_FAIL',
        payload: err,
    }
};

export const getAllUsers = (token) => {

    return dispatch => {

        axios.get("http://lumen.test/api/v1/users/retrieve?api_token="+token.api).then(response => {

                dispatch(storeUsers(response.data))
            }
        ).catch(err => {
            console.log(err);
            dispatch(failedUsers(err.data))
        })
    }

};
export const getUsers = (info) => {

    return dispatch => {

        axios.get("http://lumen.test/api/v1/users/search/"+info.e+"?api_token="+info.api).then(response => {

                dispatch(storeUsers(response.data))
            }
        ).catch(err => {
            console.log(err);
            dispatch(failedUsers(err.data))
        })
    }

};

export const deleteUser=(info)=>{

    return ()=>{
        axios.delete("http://lumen.test/api/v1/users/delete/"+info.idU+
            "?api_token="+info.api_token)
            .then(res=>{
                window.alert(res.data)
            })
    }


}

//Events

const storeEvents = users => {

    return {
        type: "STORE_EVENTS",
        payload: users,

    }
};

const failedEvents = err => {

    return {
        type: 'EVENTS_FAIL',
        payload: err,
    }
};

export const getEvents = (info) => {

    return dispatch => {

        axios.get("http://lumen.test/api/v1/events/index?api_token="+info.api)
            .then(response => {

                dispatch(storeEvents(response.data));

            }
        ).catch(err => {
            dispatch(failedEvents(err.data))
        })
    }

};


export const getEventsId=()=>{

    return {
        type: "STORE_EVENTSID",

    }
};

export const creatEditEvent=(info)=>{
    return ()=>{
        axios.post("http://lumen.test/api/v1/events/createEdit?api_token="+info.get('api'),info
                // headers: {
                //     'Content-Type': imageFile.type}
                // }
        )
            .then(response=>{
                console.log(response)
            })
    }
}
export const deleteEvent=(id)=>{
    return ()=>{
        axios.delete("http://lumen.test/api/v1/events/delete/"+id.idT+
            "?api_token="+id.api_token)
            .then(res=>{
                window.alert(res.data)
            })
    }
}
//Coupons

const storeCoupons = users => {

    return {
        type: "STORE_COUPONS",
        payload: users.data,

    }
};

const failedCoupons = err => {

    return {
        type: 'COUPONS_FAIL',
        payload: err,
    }
};

export const getCoupons = (info) => {

    return dispatch => {

        axios.get("http://lumen.test/api/v1/reductions/index?api_token="+info.api)
            .then(response => {
                console.log(response)
                dispatch(storeCoupons(response))
            }
        ).catch(err => {
            dispatch(failedCoupons(err.data))
        })
    }

};

export const createEditCoupon=(info)=>{
    return ()=>{
        axios.post("http://lumen.test/api/v1/reductions/createEdit?",info)
            .then(res=>{
                console.log(res.data)
            })
    }
}
export const delCoup=(info)=>{
    return () =>{
        axios.delete("http://lumen.test/api/v1/reductions/?id="+info)
            .then(res=>{
                console.log(res.data)
            })
    }
}


//Schedule

const storeSchedule = users => {

    return {
        type: "STORE_SCHEDULE",
        payload: users,

    }
};

const failedSchedule = err => {

    return {
        type: 'SCHEDULE_FAIL',
        payload: err,
    }
};

export const getSchedule = (info) => {

    return dispatch => {

        axios.get("http://lumen.test/api/v1/schedule/view?api_token="+info.api)
            .then(response => {
                console.log(response)
                dispatch(storeSchedule(response.data))
            }
        ).catch(err => {
            dispatch(failedSchedule(err.data))
        })
    }

};
const storeExcept=(excepts)=>{
    return{
        type:'STORE_EXCEPT',
        payload:excepts
    }
}
export const getExceptions=(info)=>{
    return dispatch=>{
        axios.get("http://lumen.test/api/v1/exceptions/index?api_token="+info.api)
            .then(response => {
                    console.log(response)
                    dispatch(storeExcept(response.data))
                }
            )

    }
}
const storeExceptDates=(excepts)=>{
    return{
        type:'STORE_EXCEPT_DATES',
        payload:excepts
    }
}
export const getExceptionDates=(info)=>{

    return dispatch=>{
        axios.get(" http://lumen.test/api/v1/exceptions/exceptionDates?api_token="+info.api)
            .then(response => {
                    console.log(response)
                    dispatch(storeExceptDates(response.data))
                }
            )

    }
}
export const deleteExcept=(info)=>{
    return ()=>{
        axios.delete("http://lumen.test/api/v1/exceptions/delete/"+info.idS+
            "?api_token="+info.api_token)
            .then(res=>{
                window.alert(res.data)
            })
    }
}
export const creatEditExcept=(info)=>{
    console.log(info)
    return ()=>{
        http://lumen.test/api/v1/exceptions/createEdit?exception_date=2018-09-19&
            // duration=3&api_token=vVO5jLInGjX3szj6LSs8n2Ueo79iBRUqQKHkeZw4KXbkq3ZaS6GWa8ZF4BFp&id=8
        axios.post("http://lumen.test/api/v1/exceptions/createEdit?" +
            "exception_date=" +info.exception_date+
            "&duration=" +info.duration+
            "&api_token=" +info.api_token+
            "&id="+info.id
            )
            .then(res=>{
               console.log(res.data)
            })
    }
}
//Restaurant Info:

export const changeAddress = info => {

    return {
        type: 'INFO_ADDRESS',
        payload: info,
    }
};
export const changePhone = info => {

    return {
        type: 'INFO_PHONE',
        payload: info,
    }
};
const changeSchedule = sch => {

    return {
        type: 'SCHEDULE_CHANGE',
        payload: sch,
    }
};
export const changeSch=(info)=>{
    return ()=>{
        axios.put("http://lumen.test/api/v1/schedule/edit",info).then(
            res=>{
                console.log(res)
            }
        )
    }
}





