const initialState = {
    in: false,
    api: '',
    user: '',
    role:2,//1:admin,2:client,3:Supervisor
    menu: [],
    loading: false,
    logFailed: false,
    logFailedError: '',
    logSuccess: false,
    regSuccess: false,
    regError: '',


};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'LOAD': {
            return {
                ...state,
                loading: true,
            }
        }

        case 'GET_MENU': {

            return {
                ...state,
                menu: state.menu.concat(action.payload.data)
            }
        }
        case 'AUTH_START': {

            console.log('here reducerAUTH_START');
            return {
                ...state,
                loading: false,
                logSuccess: true,
                logFailed: false,

                user: action.payload.data.username,
                role: action.payload.data.role_id,
                api_token: action.payload.data.api_token,
                in: true
            }
            // break;//meanwhile there is no return
        }
        case 'AUTH_FAIL': {
            return {
                ...state,
                loadingLog: false,
                logFailed: true,
                logFailedError: action.payload.data,
            }

        }
        case "REG_FAIL": {
            return {
                ...state,
                loadingLog: false,
                regFailed: true,
                regError: action.payload.data,

            }
        }
        case "REG_START": {

            return {
                ...state,
                loading: false,
                regSuccess: true,
                Error: '',
                regFailed: false,

            }
        }
        case 'OUT':{
            return{
                ...state,
                user:'',
                role: 2,
                api_token: '',
                in: false,
                regSuccess:false,
                logSuccess: false,
            }
        }
        default:
            return initialState;

    }

};

export default reducer;