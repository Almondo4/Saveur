import React, {Component} from 'react';

import "./NavItems.css";
import {Col, Row} from "react-flexbox-grid";
import FlatButton from 'material-ui/FlatButton';
import {logOut} from "../../../store/Actions/Actions";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import Logo from "../../logo/Logo";

class NavItemsSv extends Component {
    handleLogOut = () => {
        this.props.history.push("/");
        this.props.handleLogOut()
    }

    render() {
        return (<Row className={'Navlist'} between="xs" style={{width: "100%", margin: "0", padding: '0'}}>

            <Col lg={2}> <Link to={'/'} className={'Saveur'}><Logo
                style={{width:'100%',height:'600%',
                    objectFit:'contain'}}/></Link> </Col>
            <Col lg={6} xsOffset={1}>
                <Col lg={4}> <Link to={'/CouponValidation'}>Users Coupons</Link></Col>
                <Col lg={4}> <Link to={'ReservationValidation'}>Reservation Validation</Link></Col>
                <Col lg={4}><Link to={'MenuDispo'}>Menu Supervision</Link> </Col>
            </Col>

            <Col xsOffset={4} lg={2} style={{width: "100%", margin: "0", padding: '0'}}>
                <Row end="xs">
                <FlatButton label="Log out"
                            onClick={this.handleLogOut}
                            style={{color: "#c59d5f"}}/>
        </Row>
            </Col>

        </Row>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLogOut: () => dispatch(logOut()),
    }
};


export default withRouter(connect(null, mapDispatchToProps)(NavItemsSv));
