import React, {Component,Fragment} from 'react';
import {connect} from "react-redux";
import NavItemsUs from "../navItems/navItemsUs";
import NavItemsAd from "../navItems/navItemsAd";
import NavItemsCl from "../navItems/navItemsCl";
import NavItemsSv from "../navItems/navItemsSv";

import BD from "../../BackDrop/BackDrop";

import "./SideDrawer.css";

//
import Logo from "../../logo/Logo";
import {Col, Row} from "react-flexbox-grid";


class SideD extends Component {



    render() {
        let classes=[ "SD","close"];
        if(this.props.show){
        classes=[ "SD","open"];
        }
        return (
            <Fragment>
                <BD show={this.props.show} clicked={this.props.closed}/>
                < div className={classes.join(' ')}>
                    <Row sm={12} className={'BgLogo'}style={{marginBottom:"0",padding:'0',height:'250px'}}>

                        {/*<Logo  style={{width:'150%'}}/>*/}

                    </Row>
                    <Row>
                        <Col sm={12} style={{margin:"0",padding:'0'}}>
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
                        </Col>
                    </Row>
                </div>
            </Fragment>
        )
    }

};
const mapStateToProps = state => {
    return {
        in: state.main.in,
        role: localStorage.getItem("role")
    }
};
export default connect(mapStateToProps, null)(SideD);



