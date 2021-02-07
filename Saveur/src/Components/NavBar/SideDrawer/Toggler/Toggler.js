import React from "react";

import "../../Nav.css"
import Logo from "../../../logo/LogoT";

const Toggler =(props)=>(
    <div onClick={props.clicked} className={"Tg"}>
        <Logo
            style={{objectFit: 'contain',marginLeft:'20px'}}/>


    </div>
);
export default Toggler;