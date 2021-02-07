import React, {Component} from 'react';
import "./NavItems.css";
import {Col, Row} from "react-flexbox-grid";
import FlatButton from 'material-ui/FlatButton';
import {logOut} from "../../../store/Actions/Actions";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import Logo from "../../logo/Logo";
import LogoUS from "../../logo/LogoUS";
import resLogo from "../../assets/images/SaveurLogo.svg";

class NavItemsCl extends Component {
    handleLogOut = () => {
        this.props.history.push("/");
        this.props.handleLogOut()
    }

    render() {
        return (
            <Row className={'Navlist'} between="xs" style={{width: "100%", margin: "0", padding: '0'}}>
                {/*THE  PROBLEM OF IE IS PUTTING PADDING TOP IN THE WRONG PLACE !
                instead in logo i put it on some class container*/}
                <Col lg={6}>
                    <Col lg={2}> <Link to={'ClMenu'}>Menu</Link> </Col>
                    <Col lg={3}><Link to={'Coupons'}>News&Pocket</Link></Col>
                    <Col lg={4}><Link to={'Reservations'}>Make a Reservation</Link></Col>
                </Col>
                <Col lg={2} >
                    <Link to={'/'} className={'Saveur'}><LogoUS
                        style={{width: '130%',minHeight:'150px',
                            minWidth:"100px",bottom:'20px',position:'relative'}}/></Link>
                </Col>

                <Col lg={3} style={{width: "100%", margin: "0", padding: '0'}}>
                    <Col lg={6}> <Link to={'Account'}>Account</Link> </Col>

                    <Col lg={6} xsOffset={2} style={{paddingTop:'5px'}}><Row end="xs">
                        <FlatButton label="Log out"
                                                         onClick={this.handleLogOut}
                                                          style={{color: "#c59d5f"}}/></Row></Col>

                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogOut: () => dispatch(logOut()),
    }
};


export default withRouter(connect(null, mapDispatchToProps)(NavItemsCl));
