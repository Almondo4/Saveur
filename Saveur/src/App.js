import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {getSchedule, changeAddress, getExceptionDates, getCoupons} from "./store/Actions/ActionsAd";

//Bootstrap
// import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
//Nav
import ReallySmoothScroll from 'really-smooth-scroll';
import Navbar from "./Components/NavBar/Navbar";
import SideD from "./Components/NavBar/SideDrawer/SideDrawer";
//Material Ui
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//icons

import {SocialIcon} from 'react-social-icons';
//Style
import "./App.css";

//Flex-grid
import {Row, Col} from "react-flexbox-grid"
//Router
import {Route} from "react-router";
import {BrowserRouter} from 'react-router-dom';
//Not In
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import News from "./Pages/News";
import LogIn from "./Pages/SignIn";
import SignUp from "./Pages/Register";
//Client
import Account from "./Pages/Client/Account";
import ClMenu from "./Pages/Client/ClMenu";
import Coupons from "./Pages/Client/Coupons";
import Reservations from "./Pages/Client/Reservation";
//Admin
import Events from "./Pages/Admin/Events";
import ModMenu from "./Pages/Admin/ModMenu";
import Tables from "./Pages/Admin/Tables";
import Users from "./Pages/Admin/Users";
import Schedule from "./Pages/Admin/Schedule";
import CouponWs from "./Pages/Admin/CouponWorkShop";
//SuperVisor
import CouponValidation from "./Pages/Supervisor/couponValidation";
import MenuDispo from "./Pages/Supervisor/MenuDispo";
import ReservValid from "./Pages/Supervisor/ReservValid";
import {changeSch} from "./store/Actions/ActionsAd";
import {con} from "./store/Actions/Actions";

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#515150",
        primary2Color: "#fff",

        accent1Color: "#c59d5f",

    },
    raisedButton: {


        primaryColor: "#c59d5f",
        // primaryTextColor: palette.alternateTextColor,
        secondaryColor: "#c59d5f",
        // secondaryTextColor: palette.alternateTextColor,

    },
    datePicker: {
        // color: "#c59d5f",
        textColor:"#eef8ff",
        calendarTextColor: "#515150",
        selectColor:"#515150",
        selectTextColor:"#c59d5f",
        // calendarYearBackgroundColor: ,
        headerColor: "#c59d5f" ,
    },
    timePicker: {
        // color: "#c59d5f",
        textColor:"#eef8ff",
        calendarTextColor: "#515150",
        selectColor:"#515150",
        selectTextColor:"#c59d5f",
        // calendarYearBackgroundColor: ,
        headerColor: "#c59d5f" ,
    },

});

ReallySmoothScroll.shim();
class App extends Component {

    state = {
        showSideDrawer: true,
        email:'',
    };

    componentDidMount=()=>{
        const info={
            api:localStorage.getItem('api_token')
        }
        this.props.con();
        this.props.getSch(info);
        this.props.getExcep(info);
        this.props.bringCoupons(info);

    };
    //Non ned for redux in the side Drawer because am only passing functions refs not the state !

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };
    SideDrawerToggleHandler = () => {

        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    };
    handleEmailChange=(event)=>{
        this.setState({email:event.target.value})
    }
    subscribe=()=>{

    }

    render() {
        return<MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <BrowserRouter>

                <Fragment >

                    <Row>
                        <Navbar DrawerToggle={this.SideDrawerToggleHandler}/>
                        <SideD closed={this.SideDrawerClosedHandler} show={this.state.showSideDrawer}/>
                    </Row>
                    <Row style={{margin: '0'}}>
                        <Col style={{marginTop: "35px",padding:'0'}} sm={12}>

                            <Route path='/' exact component={Home}/>
                            <Route path='/LogIn' exact component={LogIn}/>
                            <Route path='/Menu' exact component={Menu}/>
                            <Route path='/News' exact component={News}/>
                            <Route path='/SignUp' exact component={SignUp}/>
                            <Route path='/Account' exact component={Account}/>
                            <Route path='/Coupons' exact component={Coupons}/>
                            <Route path='/Reservations' exact component={Reservations}/>
                            <Route path='/ClMenu' exact component={ClMenu}/>

                            {/*Admin*/}
                            <Route path='/Events' exact component={Events}/>
                            <Route path='/ModMenu' exact component={ModMenu}/>
                            <Route path='/Tables' exact component={Tables}/>
                            <Route path='/Users' exact component={Users}/>
                            <Route path='/Schedule' exact component={Schedule}/>
                            <Route path='/CouponWs' exact component={CouponWs}/>

                            {/*SuperVisor*/}
                            <Route path='/couponValidation' exact component={CouponValidation}/>
                            <Route path='/ReservationValidation' exact component={ReservValid}/>
                            <Route path='/MenuDispo' exact component={MenuDispo}/>
                            {/*In Case Of Invalide Link 404 Error: */}
                            {/*<Redirect from="/" to="/"/>*/}

                            {/*</div>*/}
                        </Col>
                    </Row>

                </Fragment>

        </BrowserRouter>;
            <footer className={"Footer"} style={{width: "100%", padding: '0'}}>
                <Row center={'xs'} style={{width: "100%", margin: "0", padding: '0'}}>
                    <Col sm={12} md={4}>


                        <p>{this.props.address}</p>
                        <p>RESERVATIONS NUMBER: {this.props.phone}</p>
                        <p style={{color: "#c59d5f"}}>WORKING HOURS:</p>
                        <p><span style={{textTransform:'Uppercase'}}>{this.props.OP}-{this.props.CP}</span>
                            : From {this.props.whO} to {this.props.whC}</p>


                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <ul className={'social'}>
                            <li><SocialIcon url="http://twitter.com/"/></li>
                            <li><SocialIcon url="http://facebook.com/"/></li>
                            <li><SocialIcon url="http://instagram.com/"/></li>
                            <li><SocialIcon url="http://github.com/"/></li>
                        </ul>

                    </Col>
                    <Col md={4} mdOffset={4}>
                        <Row>
                            <Col sm={12}>
                            <ValidatorForm
                                ref="form"
                                onSubmit={this.handleSubmit}

                            >
                                <Row>

                            <Col md={7}>
                                <TextValidator
                                    hintText="Subscribe to our newsletter "
                                    name={'mail'}
                                    floatingLabelText="Email"
                                    fullWidth={true}
                                    type={"email"}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['This field is required', 'Invalid Email']}
                                    style={{bottom: '30px'}}
                                    onChange={this.handleEmailChange}
                                    hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                    inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                    floatingLabelStyle={{color:'#c59d5f'}}/>
                            </Col>
                            <Col md={4}>
                                <RaisedButton
                                    label="Submit"
                                    type={'submit'}
                                    primary={true}
                                    fullWidth={true}
                                    onClick={this.subscribe}

                                />
                            </Col></Row></ValidatorForm></Col>
                        </Row>
                    </Col>

                </Row>
                <hr style={{backgroundColor: "#c59d5f", width: '100%'}}/>
                <p>&#9400; All rights Reserved</p>
            </footer>
        </MuiThemeProvider>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSch: (info) => dispatch(getSchedule(info)),
        changeSch: (info) => dispatch(changeSch(info)),
        getExcep:(info) => dispatch(getExceptionDates(info)),
        con:() => dispatch(con()),
        bringCoupons: (i) => dispatch(getCoupons(i)),
    }

};
const mapStateToProps = state => {
    return {
        // in: state.main.in,
        // role: state.main.role,
        exceptions: state.Ad.exceptDays,
        coupons: state.Ad.coupons,
        whO: state.Ad.openninghour,
        whC: state.Ad.closingHour,
        OP:state.Ad.openingDay,
        CP:state.Ad.closingDay,
        address:state.Ad.address,
        phone:state.Ad.phone
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
