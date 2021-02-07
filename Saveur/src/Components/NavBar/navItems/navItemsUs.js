import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./NavItems.css";
import {Col, Row} from "react-flexbox-grid";
import FlatButton from 'material-ui/FlatButton';
import {logOut} from "../../../store/Actions/Actions";
import {connect} from "react-redux";
import resLogo from "../../assets/images/SaveurLogo2US.svg";
import LogoUS from "../../logo/LogoUS";

class NavItemsUs extends Component {
    render() {
        return (


            <Row className={'Navlist'} between="xs" style={{width: "100%", margin: "0",
                padding: '0',overflow:'visible'}}>

                <Col lg={5}>
                    <Col lg={2}> <Link to={'Menu'}>Menu</Link> </Col>
                    <Col lg={3}><Link to={'News'}>News&Rewards</Link></Col>

                    <Col lg={4}><Link to={'LogIn'}>Make a Reservation</Link></Col>
                </Col>
                <Col lg={3} style={{overflow:'visible'}}>
                    <Link to={'/'} className={'Saveur'}><LogoUS
                        style={{width: '100%',minHeight:'150px',
                            minWidth:"100px",bottom:'20px',position:'relative'}}/>
                    </Link>
                </Col>

                <Col lg={2} style={{width: "100%", margin: "0", padding: '0'}}>
                    <Col lg={6}><Link to={'LogIn'}>Login</Link> </Col>
                    <Col lg={6}><Link to={'SignUp'}>SignUp</Link> </Col></Col>


            </Row>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogOut: () => dispatch(logOut()),
    }
};
export default connect(null, mapDispatchToProps)(NavItemsUs);
