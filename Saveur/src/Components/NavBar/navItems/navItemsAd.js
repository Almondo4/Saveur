import React,{Component} from 'react';
import "./NavItems.css";
import {Col, Row} from "react-flexbox-grid";
import FlatButton from 'material-ui/FlatButton';
import {logOut} from "../../../store/Actions/Actions";
import {connect} from "react-redux";
import { Link, withRouter } from "react-router-dom";
import resLogo from "../../assets/images/SaveurLogo2.svg";
import Logo from "../../logo/Logo";

class NavItemsAd  extends Component{
    handleLogOut=()=>{
        this.props.history.push("/");
        this.props.handleLogOut()
    }
    render(){
        return( <Row className={'Navlist'} between="xs" style={{width:"100%",margin:"0",padding:'0'}}>

            <Col lg={2} ><Link to={'/'} className={'Saveur'} ><Logo style={{width:'100%',height:'100px',
                objectFit:'contain'}}/></Link>
            </Col>
            <Col lg={6} xsOffset={1} >
                <Col lg={2}><Link to={'/ModMenu'}>Mod Menu</Link></Col>
                <Col lg={2}><Link to={'/Tables'}>Tables</Link> </Col>
                <Col lg={2}><Link to={'/Users'}>Users</Link></Col>
                <Col lg={2}><Link to={'/Events'}>Events</Link></Col>
                <Col lg={2}> <Link to={'/CouponWs'}>CouponWS</Link></Col>
                <Col lg={2}> <Link to={'/Schedule'}>schedule</Link></Col>
            </Col>

            <Col xsOffset={1} lg={2}  > <Row end="md"><FlatButton label="Log out"
                                                  onClick={this.handleLogOut}
                                                                                             style={{color: "#c59d5f",paddingLeft:'0 ',paddingRight:'0'}}/></Row></Col>

        </Row>)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        handleLogOut: () => dispatch(logOut()),
    }
};

export default withRouter(connect(null,mapDispatchToProps) (NavItemsAd)) ;
