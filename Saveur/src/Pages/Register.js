import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
// import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, HelpBlock,Alert} from "react-bootstrap";
import '../App.css';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Register} from "../store/Actions/Actions";

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import vid from "../Components/assets/Videos/particles.webm"
class RegisterF extends Component {

    state = {
        username: '',
        pseudo: '',
        email: '',
        password: '',
        confirm: ''
    };
    componentWillMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }

    handlePseudoChange = (event) => {
        this.setState(
            {pseudo: event.target.value}
        );
    }

    handleUserChange = (event) => {
        this.setState(
            {username: event.target.value}
        );
    }
    handlePassChange = (event) => {
        this.setState(
            {password: event.target.value}
        );
    };

    handlemailChange = (event) => {
        this.setState(
            {email: event.target.value}
        );
    };
    handleConfirmChange = (event) => {
        this.setState(
            {confirm: event.target.value}
        );
    };

    // getValidationStateUser() {
    //     const length = this.state.username.length;
    //     if (length > 3) return 'success';
    //     else if (length > 5) return 'warning';
    //     else if (length > 0) return 'error';
    //     return null;
    // }
    //
    // getValidationStatePs() {
    //     const length = this.state.pseudo.length;
    //     if (length > 3) return 'success';
    //     else if (length > 5) return 'warning';
    //     else if (length > 0) return 'error';
    //     return null;
    // }
    //
    // getValidationStatePass() {
    //     const length = this.state.password.length;
    //     if (length > 3) return 'success';
    //     else if (length > 5) return 'warning';
    //     else if (length > 0) return 'error';
    //     return null;
    // }
    //
    // getValidationStateConfirm() {
    //     const p1 = this.state.password;
    //     const p2 = this.state.confirm;
    //     if (p1 === p2 && p2 !== '') return 'success';
    //     else if (p2 !== '') return 'error';
    //     return null;
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        const info={
            name: this.state.username,
            username:this.state.pseudo ,
            email: this.state.email,
            password:this.state.password,
            role_id:2
        };
        this.props.handleS(info);
        // this.props.history.push("/");
    };

    render() {

        return <Row className="show-grid" style={{marginBottom: '127px'}}>
            <video autoPlay={true} loop={true}id="myVid"
                   style={{zIndex:'-100', position:"fixed",
                       top: '50%',
                       left: '50%',
                       minWidth: '100',
                       minHeight: '100',
                       width: 'auto',
                       height: 'auto',
                       transform: 'translate(-50%, -50%)'}}>
                <source src={vid} type="video/webm"/></video>
            {!this.props.Success ?
                <Col sm={12} md={6} mdOffset={3}>
                    <Paper zDepth={5} style={{padding: "20px", marginTop: '150px',
                        backgroundColor: 'rgba(162, 157, 152, 0.13)'}}>
                        <h1 style={{fontSize: '2em',
                            textAlign:'center',
                            fontWeight: '400',
                            letterSpacing:'0.09em',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            fontStyle: 'italic',
                            fontFamily:"Source Sans Pro",}}>Register</h1>


                        <ValidatorForm
                            ref="form"
                            onSubmit={this.handleSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <TextValidator
                                hintText="Nickname"
                                name={"nickname"}
                                value={this.state.pseudo}
                                floatingLabelText="Nickname"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                onChange={this.handlePseudoChange}
                                fullWidth={true}
                                hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                inputStyle={{ color: 'white', fontSize: '20px' }}
                                floatingLabelStyle={{color:'#c59d5f'}}
                            ></TextValidator>

                            <TextValidator
                                hintText="Reservation will be taken by this name"
                                value={this.state.username}
                                name={"name"}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                onChange={this.handleUserChange}
                                fullWidth={true}
                                floatingLabelText="FullName"
                                hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                inputStyle={{ color: 'white', fontSize: '20px' }}
                                floatingLabelStyle={{color:'#c59d5f'}}
                            ></TextValidator>
                            {/*Email*/}

                            <TextValidator
                                hintText="Example255@example.com"
                                name={"email"}
                                value={this.state.email}
                                onChange={this.handlemailChange}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'Email is not valid']}
                                fullWidth={true}
                                floatingLabelText="Email"
                                hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                inputStyle={{ color: 'white', fontSize: '20px' }}
                                floatingLabelStyle={{color:'#c59d5f'}}
                            >
                            </TextValidator>

                            {/*Password*/}

                            <TextValidator
                                hintText="Password"
                                name={"password"}
                                value={this.state.password}
                                type="password"
                                onChange={this.handlePassChange}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                fullWidth={true}
                                floatingLabelText="Password"
                                hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                inputStyle={{ color: 'white', fontSize: '20px' }}
                                floatingLabelStyle={{color:'#c59d5f'}}
                            ></TextValidator>
                            {/*ConfirmPass*/}

                            <TextValidator
                                hintText="Confirm Password"
                                name={"confirmp"}
                                type="password"
                                value={this.state.confirm}
                                onChange={this.handleConfirmChange}
                                validators={['required', 'isPasswordMatch']}
                                errorMessages={['this field is required', 'Password Mismatch']}
                                fullWidth={true}
                                floatingLabelText=" Confirm Password"
                                hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                inputStyle={{ color: 'white', fontSize: '20px' }}
                                floatingLabelStyle={{color:'#c59d5f'}}
                            ></TextValidator>
                            <RaisedButton label="Submit" type="submit"
                                          fullWidth={true} primary={true}
                                          style={{marginTop:"65px"}}
                            />
                        </ValidatorForm>
                    </Paper>

                </Col> :  <Col mdOffset={3}>
                    <h1 style={{textAlign: 'center',padding:'200px'}}>Congratulations ! Please Proceed to Log In</h1>
                        </Col>
                    }




        </Row>;
    };
}

const mapStateToProps = (state) => {
    return {
        Success: state.main.regSuccess,
        Error: state.main.regError,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleS: (vals) => dispatch(Register(vals)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterF);