import React from "react";

import"./BdStyle.css";
const BackDrop=(props)=>(
    props.show?<div className={"BD"} onClick={props.clicked  }></div>:null

);
export default BackDrop;