  import axios from"axios";
  import {BrowserRouter} from 'react-router-dom';
  import React from "react";

const saveMenu=(res)=>{
    return{
        type:'GET_MENU',
        payload:res
    }
    };

  export const getMenu=()=>{
      return dispatch=>{

          axios.get("http://lumen.test/products/menu?")
              .then(res=>{

              console.log("got menu");
               dispatch(saveMenu(res));
              }

          )
      }
  };




  //Signing in
  const AuthCreate=(res)=>{
      window.alert(JSON.stringify(res.data));
      localStorage.setItem('api_token',res.data.api_token);
      localStorage.setItem('role',res.data.role_id);
      localStorage.setItem('user',res.data.username);
      localStorage.setItem('email',res.data.email);
      localStorage.setItem('name',res.data.name);
      localStorage.setItem('id',res.data.id);
      localStorage.setItem('in',true);

      return{
          type:"AUTH_START",
          payload:res
      }

  };

  const AuthFailed=(res)=>{
      window.alert(JSON.stringify(res.data));
      return{
          type:"AUTH_FAIL",
          payload:res
      }

  };
  const startAuth=()=>{
      return{
          type:"LOAD",

      }

  };

  export const authSend=(values)=>{

      return dispatch=>{
            // console.log(values)
          // dispatch(startAuth());
          axios.put("http://lumen.test/login",values).then(
              res=>{
                  if(res.data.api_token){
                      dispatch(AuthCreate(res))
                  }else{
                      dispatch(AuthFailed(res))
                  }
                 }
          )
      }
  };

  //Registration
  const RegCreate= res=>{

      return{
          type:"REG_START",
          payload:res
      }

  };

  const RegFailed=(res)=>{
      window.alert(JSON.stringify(res.data) );
      return{
          type:"REG_FAIL",
          payload:res
      }

  };
  const startReg=()=>{
      return{
          type:"LOAD",

      }

  };

  export const Register =(values)=>{

      return dispatch=>{
          // console.log(values)
          dispatch(startReg());
          axios.post("http://lumen.test/signup",values).then(
              res=>{
                  console.log(res);
                  window.alert(JSON.stringify(res) );
                  if(res.data.name){
                      dispatch(RegCreate(res))
                  }else{
                      dispatch(RegFailed(res))
                  }
                 }
          ).catch(
              res=>dispatch(RegFailed(res))
          )
      }
  };

  //LOGGING OUT:
  export const logOut =()=>{
      localStorage.removeItem('api_token');
      localStorage.setItem('role',0);
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('id');
      return{
          type:'OUT'
      }
  }
  export const con=()=>{
      if (!localStorage.getItem('role')){
          localStorage.setItem('role',0);
      }
      return{
          type:''
      }
  }

