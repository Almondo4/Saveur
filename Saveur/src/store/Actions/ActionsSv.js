import axios from "axios";

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

export const getUsers = (info) => {

    return dispatch => {
        
        axios.get("http://lumen.test/api/v1/users/search/"+info.e+"?api_token="+info.api)
            .then(response => {

                dispatch(storeUsers(response.data))
            }
        ).catch(err => {
            dispatch(failedUsers(err.data))
        })
    }

};

//Reservations

const storeReserv=(reservations)=>{

    return{
        type:"STORE_RESERVATION",
        payload:reservations
    }
};
const failedRESERV=(err)=>{
    return{
        type:"FAIL_RESERVATION",
        payload:err
    }

};
////////////////////TODAYS
export const getReservations=(info)=>{

  return dispatch=>{

      axios.get("http://lumen.test/api/v1/reservations/daily?api_token="+info.api)
          .then(response => {
            console.log(response)
              dispatch(storeReserv(response.data))
          }
      ).catch(err => {
          dispatch(failedRESERV(err.data))
      })
  }
};
/////////////BY USERNAME
export const getUSERReservations=(info)=>{
    console.log(info.e)
    return dispatch=>{

        axios.get("http://lumen.test/api/v1/reservations/findReservationByname?api_token="+info.api
        +"&name="+info.e)
            .then(response => {
                console.log(response)
                    dispatch(storeReserv(response.data))
                }
            ).catch(err => {
            dispatch(failedRESERV(err.data))
        })
    }
};
///////////////ALL RESERVATIONS
export const getALLReservations=(info)=>{

    return dispatch=>{

        axios.get("http://lumen.test/api/v1/reservations/index?api_token="+info.api)
            .then(response => {
                console.log(response)
                    dispatch(storeReserv(response.data))
                }
            ).catch(err => {
            dispatch(failedRESERV(err.data))
        })
    }
};
export const validateR=(info)=>{

    return ()=>{

        axios.put("http://lumen.test/api/v1/reservations/daily?api_token="+info.api)
            .then(response => {

                   window.alert(response)
                }
            )
    }
};

export const removeReserv=(info)=>{

    return ()=>{

        axios.get("http://lumen.test/api/v1/reservations/cancel/"
            +info.id+"?api_token="+info.api).then(response => {
                window.alert(response)
            }
        )
    }

};
//
const storeCoupon=(coupons)=>{

    return{
        type:"COUPON_STORE",
        payload:coupons
    }
};
const failedCoupon=(err)=>{
    return{
        type:"FAIL_COUPON",
        payload:err
    }

};
export const getCoupons=(info)=>{

    return dispatch=>{

        axios.get("http://lumen.test/api/v1/reductions/retrieve/"
            +info.e+"?api_token="+info.api).then(response => {

                dispatch(storeCoupon(response.data))
            }
        ).catch(err => {
            dispatch(failedCoupon(err.data))
        })
    }

};
export const validateCPN=(info)=>{

    return ()=>{

        axios.put("https://jsonplaceholder.typicode.com/users")

            .then(response => {

                window.alert(response)
            }
        )
    }};

//

export const makeAvailable=(info)=>{

    return ()=>{

        axios.put("http://lumen.test/api/v1/products/availability/"+info.idT+"?"+
            "api_token="+info.api_token+"&available=1").then(response => {

            console.log(response)
            }
        )
    }};

export const makeOut=(info)=>{

    return ()=>{

        axios.put("http://lumen.test/api/v1/products/availability/"+info.idT+"?"+
            "api_token="+info.api_token+"&available=0").then(response => {

                console.log(response)
            }
        )
    }};
