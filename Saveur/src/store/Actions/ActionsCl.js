//Coupons
import axios from "axios";


//Coupons
const storeCoupon=(coupons)=>{

    return{
        type:"MYCOUPON_STORE",
        payload:coupons
    }
};
const failedCoupon=(err)=>{
    return{
        type:"FAIL_COUPON",
        payload:err
    }

};
export const getOwnCoupons=(info)=>{

    return dispatch=>{

        axios.get("http://lumen.test/api/v1/reductions/view?api_token="+info.api)
            .then(response => {

                dispatch(storeCoupon(response.data))
            }
        ).catch(err => {
            dispatch(failedCoupon(err.data))
        })
    }
};

// Account

const storeAccount=(coupons)=>{

    return{
        type:"ACCOUNT",
        payload:coupons
    }
};
const failedAccount=(err)=>{
    console.log(err)

};
export const getAccount=(info)=>{
    console.log(info.api_token)

    return dispatch=>{

        axios.get("http://lumen.test/api/v1/users/account?api_token="
            +info.api_token).then(response => {

                dispatch(storeAccount(response.data))
            }
        ).catch(err => {
            dispatch(failedCoupon(err.data))
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
export const getReservations=()=>{

    return dispatch=>{

        axios.get("http://lumen.test/api/v1/reservations/view?api_token="+localStorage.getItem("api_token"))
            .then(response => {

                dispatch(storeReserv(response.data))
            }
        ).catch(err => {
            dispatch(failedRESERV(err.data))
        })
    }
};

export const deleteReservation=(info)=>{
    return ()=>{
        axios.delete("http://lumen.test/api/v1/reservations/cancel/"+info.idR+
            "?api_token="+info.api_token)
            .then(res=>{
                window.alert(res.data)
            })
    }
}
const storeFree=(info)=>{
    return{
        type:'STORE_FREE',
        payload:info
    }
}

export const checkFree=(info)=>{
    console.log('h');
    return dispatch=>{
        axios.get("http://lumen.test/api/v1/reservations/freeTables?api_token="
            +info.api_token+ "&duration="+info.duration+"&reservation_time="+
            info.reservation_time+"&reservation_date="+info.reservation_date

        ).then(res=>{
                console.log(res);
                dispatch(storeFree(res));
        }).catch(err=>{
            console.log(err);
        })
    }
}
const tableSelected=()=>{
    return{
        type:'TABLE_SELECTED'
    }
}
export const makeReserv=(info)=>{
    console.log(info)
    return dispatch=>{
        // ?reservation_date=2018-06-19&&duration=1&position=5&reservation_time=22:00:00
        // axios.post("http://lumen.test/api/v1/reservations/add?reservation_date="+info.reservation_date
        //     +"&api_token="+info.api_token
        //     +"&duration="+info.duration
        //     +"&position="+info.position
        //     +"&reservation_time="+info.reservation_time
        // )

        axios.post("http://lumen.test/api/v1/reservations/add?",info).then(
            res=>{
                console.log(res)
                    window.alert(res.data)
                    dispatch(tableSelected())

            }
        )
    }
}
//Change account params


const changeA=(res)=>{
    return{
        type:'CHANGE_A',
        payload:res.data
    }
}
export  const changeAccount=(info)=>{
    console.log("here"+info.data)
    return ()=>{

        axios.post("http://lumen.test/api/v1/users/edit?api_token="+info.api_token,info)
            .then(res=>{
            //     if(res.data.api_token){
            //         dispatch(changeA(res));
            //     }
            //     else{window.alert(res.data)}

                console.log(res)
                })

    }}
    ///////Cart

    export  const addCart=(info)=>{
        console.log("here"+info)
        return ()=>{

            axios.post("http://lumen.test/api/v1/cart/add??api_token="+info.api_token,info)
                .then(res=>{
                    console.log(res)
                })

        }}

        export  const removeCart=(info)=>{
    console.log(info)
            return ()=>{

                axios.delete("http://lumen.test/api/v1/cart/remove/"+info.id+"?api_token="+info.api_token)
                    .then(res=>{
                        console.log(res)
                    })

            }}

            const storeCart=(res)=>{
                return{
                    type:'STORE_CART',
                    payload:res.data
                }
            }

            export  const getCart=(info)=> {
            console.log(info.api_token)
                return (dispatch) => {

                    axios.get("http://lumen.test/api/v1/cart/view?api_token="+info.api_token)
                        .then(res => {

                            dispatch(storeCart(res))
                            console.log(res)
                        })

                }}

                export  const applyCart=(info)=>{
                    return ()=>{

                        axios.delete("http://lumen.test/api/v1/cart/submit/"+info.idR+"?api_token="+info.api_token)
                            .then(res=>{
                                console.log(res)
                            })

                    }

                    }


