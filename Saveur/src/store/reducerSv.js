const initialState={

    users:[],
    Reservations:[],
    fetchedCoupons:[]
};
const reducerSV=(state=initialState,action)=>{
    switch (action.type){
        //Users
        case'STORE_USERS':{
            return{
                ...state,
                users:action.payload || []
            }
        }
                //in-case Backend has return
        case'USERS_FAIL':{
            return{
                ...state,
            }
        }
        //Reservations
        case'STORE_RESERVATION':{
            return{
                ...state,
                Reservations:action.payload ||[]

            }
        }
        case'FAIL_RESERVATION':{
            return{
                ...state,
            }
        }
        //Coupons
        case'COUPON_STORE':{

            return{
                ...state,
                fetchedCoupons:action.payload ||[]
            }

        }
        case'FAIL_COUPON':{

            return{
                ...state,
            }

        }


        default:return state;

    }

};
export default reducerSV;