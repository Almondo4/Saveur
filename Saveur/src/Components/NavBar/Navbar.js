import React, {Fragment,Component} from "react";
import {connect} from"react-redux";
import"./Nav.css";

//navItems
import NavItemsUs from "./navItems/navItemsUs";
import NavItemsAd from "./navItems/navItemsAd";
import NavItemsCl from "./navItems/navItemsCl";
import NavItemsSv from "./navItems/navItemsSv";
import Toggler from"./SideDrawer/Toggler/Toggler";

import {Row,Col} from "react-flexbox-grid";
class navBar extends Component{

    render(){
        return(

            <Row className={"nav"} style={{margin:"0",padding:'0',maxWidth:'100%'}}>
                <Col sm={12} style={{margin:"0",padding:'0'}}>
               <Toggler clicked={this.props.DrawerToggle} className={"Tg"} />

                {/*put the height here*/}
                <nav className={"DesktopOnly"} style={{ overflow:'visible'}}>

                    {
                        this.props.role==='0' ?
                            <NavItemsUs/>:
                            this.props.role==='1'?
                                <NavItemsAd/>:
                                this.props.role==='2'?
                                    <NavItemsCl/>:
                                    this.props.role ==='3' ?
                                    <NavItemsSv/>:null
                    }

                </nav>
                </Col>

            </Row>

        )

    }



};
const mapStateToProps=state=>{
    return{
        in:localStorage.getItem("in"),
        role:localStorage.getItem("role")
    }
};
export default connect(mapStateToProps,null) (navBar);