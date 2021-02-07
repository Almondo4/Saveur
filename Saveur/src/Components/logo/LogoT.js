import React from 'react';
import resLogo from "../assets/images/last logo.svg";
import "./logoStyle.css";
const logoT=props=>{
    return(

        <img src={resLogo} alt={"AliRamRest"} className={'App-logo'} style={props.style}/>

    )

};
export default logoT;