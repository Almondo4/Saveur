const initialState={
    coupons:[],
    Ftables:[],
    reservations:[],
    subONE:false,
    subTwo:false,
    cart:[],
    myCoupons:[],
    accountName:'',
    accountusername:'',
    accountEmail:'',
    accountImg:null,
    accountRole:'',
};
const reducerCL=(state=initialState,action)=>{

    switch(action.type){
        case'':{
            return{
                ...state
            }
        }

        ///CART
        case'STORE_CART':{
            return{
                ...state,
                cart:action.payload||[]
            }
        }

        // Account
        case'ACCOUNT':{
            return{
                ...state,
                accountName:action.payload[0].name,
                accountusername:action.payload[0].username,
                accountEmail:action.payload[0].email,
                accountImg:action.payload[1]? action.payload[1].image_path:null,
                accountRole:action.payload[0].role_id,

            }
        }

        //    Coupons
        case'COUPON_STORE':{
            return{
                ...state,
                coupons:state.coupons.concat(action.payload)
            }
        }

        case'MYCOUPON_STORE':{
            return{
                ...state,
                myCoupons:action.payload || []
            }
        }

        case'FAIL_COUPON':{
            return{
                ...state,
            }
        }
        // Reservations
        case'STORE_RESERVATION':{
            return{
                ...state,
                reservations:action.payload || []
            }
        }
        case'FAIL_RESERVATION':{
            return{
                ...state
            }
        }
        case'STORE_FREE':{

            return{
                ...state,
                Ftables:action.payload.data || [],
                subONE:true
            }
        }
        case 'TABLE_SELECTED':{
            return{
                ...state,
                subTwo:true,


            }
        }
        //Account
        case'CHANGE_A':{
            localStorage.setItem('name',action.payload.name);
            localStorage.setItem('user',action.payload.username);
            localStorage.setItem('email',action.payload.email);

            return{
                ...state
            }
        }
        default:return state
    }

};
export default reducerCL;