import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

// import {Grid,Row,Col,FormGroup,FormControl,ControlLabel,Button,Checkbox,HelpBlock,Alert} from"react-bootstrap";
import '../App.css';
import {authSend} from "../store/Actions/Actions";
//Mat-Ui
import { Col , Row } from 'react-flexbox-grid';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import vid from "../Components/assets/Videos/particles.webm"

class SignIn extends Component {

    state = {

        pseudo: '',
        password: ''
    };

    handlePassChange = (event) => {
        this.setState(
            {password: event.target.value}
        );
    };

    // getValidationStateUser() {
    //     const length = this.state.pseudo.length;
    //     if (length > 3) return 'success';
    //     else if (length > 5) return 'warning';
    //     else if (length > 0) return 'error';
    //     return null;
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        const info={

            username:this.state.pseudo ,

            password:this.state.password ,

        };
        this.props.handleS(info);
    };
    handlePseudoChange = (event) => {
        this.setState(
            {pseudo: event.target.value}
        );
    };

    // getValidationStatePass() {
    //     const length = this.state.password.length;
    //     if (length > 3) return 'success';
    //     else if (length > 5) return 'warning';
    //     else if (length > 0) return 'error';
    //     return null;
    // }
    //
    // form = null;

    render() {

        return (
            <Fragment>

                <Row center={'xs'} style={{marginBottom: '100px'}}>
                    <video autoPlay={true} loop={true}id="myVid"
                           style={{zIndex:'-100', position:"fixed",
                               top: '50%',
                               left: '50%',
                               minWidth: '100',
                               minHeight: '100',
                               width: 'auto',
                               height: 'auto',
                               transform: 'translate(-50%, -50%)'}}>
                        <source src={vid} type="video/webm"/>

                    </video>
                    <Col md={8} style={{marginBottom: '100px', marginTop:'205px'}}>
            {/*<Paper zDepth={2} style={{padding: "20px", backgroundColor: '#3b3b3b'}}>*/}

            <Col sm={12} md={10} mdOffset={1}
                 style={{margin:'auto',position: 'relative' ,/* or absolute */
                top: '50',
                left: '50',}}>
                <Paper zDepth={2} style={{padding: "20px",backgroundColor: 'rgba(162, 157, 152, 0.13)'}}>
                    {!this.props.success ?
                        <Fragment>
                    <h1  style={{fontSize: '2em',
                        textAlign:'center',
                        fontWeight: '400',
                        letterSpacing:'0.09em',
                        textTransform: 'uppercase',
                        color: '#ffffff',
                        fontStyle: 'italic',
                        fontFamily:"Source Sans Pro",}}>Login</h1>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >
                <TextValidator
                    hintText="UserName"
                    name={"nickname"}
                    value={this.state.pseudo}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    floatingLabelText="Username"
                    onChange={this.handlePseudoChange}
                    fullWidth={true}

                    hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                    inputStyle={{ color: 'white', fontSize: '20px' }}
                    floatingLabelStyle={{color:'#c59d5f'}}
                    // underlineFocusStyle={{ borderColor: tealA400 }}
                    // underlineStyle={{ borderColor: tealA400 }}
                />

                <TextValidator
                    hintText="Password"
                    name={"password"}
                    value={this.state.password}
                    validators={['required']}
                    errorMessages={['this field is required']}
                    type="password"
                    onChange={this.handlePassChange}
                    fullWidth={true}
                    floatingLabelText="Password"
                    hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                    inputStyle={{ color: 'white', fontSize: '20px' }}
                    floatingLabelStyle={{color:'#c59d5f'}}
                />
                <RaisedButton label="Submit" onClick={this.handleSubmit}
                              fullWidth={true} primary={true}
                style={{marginTop:"65px"}}
                />
                    </ValidatorForm></Fragment>:
                        <h1 style={{textAlign: 'center',padding:'200px',
                            fontSize: '2em',
                            fontWeight: '400',
                            textAlign:"center",
                            letterSpacing:'0.09em',
                            textTransform: 'uppercase',
                            color: '#ffffff',
                            fontStyle: 'italic',
                            fontFamily:'Cinzel Decorative,cursive'}

                        }>Welcome! {this.props.user}.</h1>

                    }
                </Paper>
            </Col>
            {/*</Paper>*/}
                    </Col></Row>
            </Fragment>
        )


    };
}

const mapStateToProps = (state) => {
    return {
        loading: state.main.loading,
        user: state.main.user,
        Error: state.main.logFailedError,
        success: state.main.logSuccess
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleS: (vals) => dispatch(authSend(vals)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);