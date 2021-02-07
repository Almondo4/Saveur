import React, {PureComponent, Fragment} from 'react';
import {connect} from "react-redux";
import moment from 'moment';

//Mui
import {Col, Row} from "react-flexbox-grid";
import Paper from 'material-ui/Paper';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';

import FlatButton from 'material-ui/FlatButton';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';


import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Logo from "../../Components/assets/images/Stocks/coming-soon.jpg";

import {getReservations,deleteReservation,checkFree,makeReserv,getCart,removeCart,applyCart} from "../../store/Actions/ActionsCl";
import{getExceptionDates}from "../../store/Actions/ActionsAd";


class Reservation extends PureComponent {

    state = {
        finished: false,
        stepIndex: 0,
        duration:null,
        submitOne:false,
        submitTwo:false,
        reservDate:null,
        reservHour:null,
        selectedR:"",


    };
    componentDidMount = () => {
        console.log(this.state.submitOne);
        const info={
            api:localStorage.getItem('api_token')
        }
        const info2={
            api_token:localStorage.getItem('api_token')
        }
        this.props.getCart(info2);
        this.props.getReserv();
        this.props.getExcep(info);
        this.props.getCart(info2);


    };

    checkDate=(date)=>{
        let x =moment(date).format('YYYY-MM-DD')
        console.log(x)
         // this.props.exceptions.indexOf("2018-05-08");
       console.log("check"+this.props.exceptions);
        // console.log(moment(date).format('YYYY-MM-DD '))

        // console.log(Array.find(moment(date).format('YYYY-MM-DD '),this.props.exceptions))
        // console.log(this.props.exceptions.includes(moment(date).format('YYYY-MM-DD ')))
        // console.log(moment(date).format('YYYY-MM-DD '))
      return this.props.exceptions.indexOf(x)>0?true:false;

    }
    handleCart=()=>{
        const info2={
            api_token:localStorage.getItem('api_token'),
            idR:this.state.selectedR,
        }
        this.props.applyCart(info2)
    }

    handleDeleteR = (id) => {
        const info = {
            api_token: localStorage.getItem('api_token'),
            id: id

        }
        this.props.removeCart(info);
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        console.log(this.props.exceptions)
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,

        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };
    handleChangeD=(event, index, value)=>{
        this.setState({duration:value});

    };
    handleStartChange=(event,date)=>{
        const d= moment(date).format('YYYY-MM-DD');
        this.setState({reservDate:d})
        console.log(this.state.reservDate)
    };
    handleHourChange=(event,time)=>{
        const t= moment(time).format('HH:mm:ss');
        this.setState({reservHour:t})
        console.log(this.state.reservHour)
    };

    submitOne=()=>{
        this.setState({submitOne:true});
        const info={
            reservation_time:this.state.reservHour,
            reservation_date:this.state.reservDate,
            duration:this.state.duration,
            api_token:localStorage.getItem('api_token')
        }

        this.props.lookFree(info)
    };
    submitTwo=(id)=>{
        this.setState({submitTwo:true});
        const info={
            reservation_date:this.state.reservDate,
            api_token:localStorage.getItem('api_token'),
            position:id,
            reservation_time:this.state.reservHour,
            duration:this.state.duration,

        }
        this.props.reserv(info)

    }
    handleSelectReserv= (event, index, value) => {
        this.setState({selectedR: value});

    }
    handleDelete = (id) => {
        const info = {
            api_token: localStorage.getItem('api_token'),
            idR: id

        }
        this.props.deleteReserv(info)
        // console.log(this.props.cart)
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                let x = new Date();

                return (<Row center="xs" middle="xs">

                    {/*<ValidatorForm*/}
                        {/*ref="form"*/}
                        {/*onSubmit={this.submitOne}*/}
                        {/*onError={errors => console.log(errors)}*/}
                    {/*>*/}
                    {/*Date*/}
                    <Col md={3} sm={12}>
                        <DatePicker minDate={x} hintText="Date "
                                       name={"date"}
                                    fullWidth={true}
                                    onChange={this.handleStartChange}
                                    shouldDisableDate={this.checkDate}
                                       autoOk={true}
                                    hintStyle={{ color: '#c59d5f', fontSize: '20px' }}
                                    inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                    floatingLabelStyle={{color:'#c59d5f'}}

                        />

                    </Col>

                    <Col md={4} xm={12} style={{textAlign:'center'}}>
                    {/*//Hour*/}
                    <TimePicker
                        hintText="Time"
                        name={'time'}
                        minutesStep={5}
                        fullWidth={true}
                        autoOk={true}
                        onChange={this.handleHourChange}
                        hintStyle={{ color: '#c59d5f', fontSize: '20px' }}
                        inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                        floatingLabelStyle={{color:'#c59d5f'}}

                    />
                    </Col>

                    <Col md={3} sm={12}>
                    {/*//Duration*/}
                    <SelectField
                        floatingLabelText="Duration"
                        name={"duration"}
                        value={this.state.duration}
                        onChange={this.handleChangeD}
                        style={{bottom: 10}}
                        fullWidth={true}
                        hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                        labelStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                        floatingLabelStyle={{color:'#c59d5f'}}
                    >

                        <MenuItem value={1} primaryText="1 hour"/>
                        <MenuItem value={2} primaryText="2 hours"/>
                        <MenuItem value={3} primaryText="3 hours"/>

                    </SelectField>
                    </Col>
                    <Col md={1} sm={12}>
                    <RaisedButton primary={true} label={"submit"}
                                  fullWidth={true}
                                  onClick={this.submitOne}
                                  />
                    </Col>
                    {/*</ValidatorForm>*/}
                </Row>);
            case 1:

                return (
                    <Row between={'xs'}>
                                <Col lg={4}>
                                    {this.props.freeTables.map(
                                        table => {
                                            x="Table "+table.id
                                            return (


                                                <Card style={{margin: '5px 0'}} className={"cardBG4"}
                                                      style={{margin: '5px 0',textAlign:'center',backgroundColor:"rgba(0, 0, 0, 0.44)",
                                                          borderRadius:'25px',border:'5px double #c59d5f'}}key={table.position}>


                                                    <CardText >
                                                        <ul style={{listStyleType:'none'}}>
                                                            <li>
                                                            <span style={{textAlign: 'center', fontSize: '1.3em', fontWeight: '700', color: '#c59d5f',
                                                                fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                                                Position &nbsp;
                                                                </span>

                                                            <span style={{
                                                                fontWeight: '500',fontSize:"1.2em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                                overflow:'hidden',textAlign:'center'}}>{table.position}
                                            </span></li>
                                                            <li>
                                                            <span style={{textAlign: 'center', fontSize: '1.3em', fontWeight: '700', color: '#c59d5f',
                                                                fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                                                With &nbsp;
                                                                </span>

                                                                <span style={{
                                                                    fontWeight: '500',fontSize:"1.2em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                                    overflow:'hidden',textAlign:'center'}}>{table.nbPlaces} chairs
                                            </span></li>
                                                        </ul>
                                                    </CardText>
                                                    <CardActions>
                                                        <FlatButton label="Book" style={{color: "green"}}
                                                                    onClick={this.submitTwo.bind(this,table.position)}/>

                                                    </CardActions>

                                                </Card>


                                                // {/*Check for a trick to render coupons*/}

                                            )
                                        }
                                    )}
                    </Col>
                        <Col lg={5} className={"map"}>


                        </Col>

                    </Row>
                );
            case 2:
                return (
                    <Row between={"xs"}>
                        <Col  md={8}style={{margin: '5px 0'}} className={"cardBG4"}
                        style={{margin: '5px 0',textAlign:'center',backgroundColor:"rgba(0, 0, 0, 0.44)",
                            borderRadius:'25px',border:'5px double #c59d5f'}}>

                            <Row>

                                <Col md={4}>
                                    <p style={{fontSize: '1.3em',
                                        textAlign:'center',
                                        fontWeight: '400',
                                        letterSpacing:'0.09em',
                                        color: '#c8d4ff',
                                        fontStyle: 'italic',
                                        fontFamily:'Cinzel Decorative,cursive',}}>
                                        Would you like Ao Apply Cart To currennt reservation ?

                                    </p>
                                </Col>
                                <Col md={6}>
                                <SelectField
                                    floatingLabelText="Which Reservation"
                                    value={this.state.Open}
                                    onChange={this.handleSelectReserv}
                                    fullWidth={true}
                                    hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                    labelStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                    floatingLabelStyle={{color:'#c59d5f'}}
                                >

                                        {this.props.reservations.map(dish=>{
                                            return(
                                                <MenuItem value={dish.id} primaryText={dish.id} key={dish.id}/>

                                            )}
                                        )}F


                                </SelectField></Col>
                                <Col md={3}>

                                    <RaisedButton
                                        label="YES!"
                                        primary={true}
                                        onClick={this.handleCart}
                                    />
                                </Col>
                            </Row>


                        </Col>

                    </Row>
                );
            default:
                return 'Sorry there has been an Error !';
        }
    }


    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        return (
            <Paper className={"menuCover"}style={{ height:"110%",
                marginBottom:'650px',backgroundAttachment:'fixed'}}>

                {/*<h1>Reservation</h1>*/}
                <Row center="xs">
                    <Col sm={12}  >


                            <h1   style={{fontSize: '4em',
                                textAlign:'center',
                                fontWeight: '400',
                                letterSpacing:'0.09em',
                                margin:'20px',
                                textShadow: '0px 4px 3px rgba(0,0,0,0.4),0px 8px 13px rgba(0,0,0,0.1),0px 18px 23px rgba(0,0,0,0.1)',
                                paddingTop:'200px',
                                color: '#cda561',
                                fontStyle: 'italic',
                                fontFamily:'Cinzel Decorative,cursive',}}>Make a Reservation</h1>
                            <div>
                                <Stepper activeStep={stepIndex}>
                                    <Step>
                                        <StepLabel  style={{fontSize: '1.3em',
                                            textAlign:'center',
                                            fontWeight: '400',
                                            letterSpacing:'0.09em',
                                            color: '#c8d4ff',
                                            fontStyle: 'italic',
                                            fontFamily:'Cinzel Decorative,cursive',}}>Select Date&Time  and the Duration of Reservation</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel  style={{fontSize: '1.3em',
                                            textAlign:'center',
                                            fontWeight: '400',
                                            letterSpacing:'0.09em',
                                            color: '#c8d4ff',
                                            fontStyle: 'italic',
                                            fontFamily:'Cinzel Decorative,cursive',}}>Select Table Position</StepLabel>
                                    </Step>
                                    <Step>
                                        <StepLabel  style={{fontSize: '1.3em',
                                            textAlign:'center',
                                            fontWeight: '400',
                                            letterSpacing:'0.09em',
                                            color: '#c8d4ff',
                                            fontStyle: 'italic',
                                            fontFamily:'Cinzel Decorative,cursive',}}>Would you like to pre-order your dishes?</StepLabel>
                                    </Step>
                                </Stepper>
                                <div style={contentStyle}>
                                    {finished ? (
                                        <p>
                                            <a
                                                href="#"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    this.setState({stepIndex: 0, finished: false});
                                                }}
                                            >
                                                Click here
                                            </a> to redo the Process
                                        </p>
                                    ) : (
                                        <div>
                                            <p>{this.getStepContent(stepIndex)}</p>
                                            <div style={{marginTop: 12}}>
                                                <FlatButton
                                                    label="Back"
                                                    disabled={stepIndex === 0}
                                                    onClick={this.handlePrev}
                                                    style={{marginRight: 12}}
                                                />
                                                <RaisedButton
                                                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                                                    primary={true}
                                                    disabled={this.props.sub===false?true:false}
                                                    onClick={this.handleNext}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>



                    </Col>
                </Row>
                <Row center="xs" style={{marginTop:"70px"}}>

                    <Col md={8}>
                    <h3 style={{fontSize: '2em',
                        textAlign:'center',
                        fontWeight: '400',
                        letterSpacing:'0.09em',
                        margin:'20px',
                        color: '#c8d4ff',
                        fontStyle: 'italic',
                        fontFamily:'Cinzel Decorative,cursive',}}>Your Reservations</h3>
                    <Paper zDepth={2} style={{padding: "20px",backgroundColor:"rgba(0, 0, 0, 0.44)",marginBottom:'100px'}}>

                    <Paper zDepth={2} style={{padding: "20px"}} className={"cardBG2"}>
                        {
                            this.props.reservations ?
                                <Row between={'xs'}>
                                    {this.props.reservations.map(
                                        reserv => {
                                            // const x="Reservation: "+reserv.id;
                                            return (

<Col md={6}>
                                                <Card style={{margin: '5px 0'}} key={reserv.id} className={"cardBG"}>
                                                    <CardHeader
                                                        actAsExpander={true}
                                                        showExpandableButton={true}
                                                    >
                                                    <span style={{textAlign: 'center', fontSize: '1.3em',
                                                        fontWeight: '700', color: '#c59d5f',
                                                     fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                            Reservation:  &nbsp;
                                            </span>
                                            <span style={{
                                                fontWeight: '500',fontSize:"1.2em",color: "rgb(99, 99, 103)",textOverflow:'ellipsis',
                                                overflow:'hidden',textAlign:'center'}}>{reserv.id}
                                            </span>

                                                    </CardHeader>
                                                    <CardText expandable={true}>
                                                        <ul style={{listStyleType:'none'}}>
                                                            <li>
                                                             <span style={{textAlign: 'center', fontSize: '1.3em',
                                                                 fontWeight: '700', color: '#c59d5f',
                                                                 fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                                         Reservation date:  &nbsp;
                                                             </span>
                                                            <span style={{
                                                                fontWeight: '500',fontSize:"1.2em",color: "rgb(99, 99, 103)",textOverflow:'ellipsis',
                                                                overflow:'hidden',textAlign:'center'}}>{reserv.reservation_date}
                                                              </span>
                                                            </li>

                                                            <li>
                                                             <span style={{textAlign: 'center', fontSize: '1.3em',
                                                                 fontWeight: '700', color: '#c59d5f',
                                                                 fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                                         At:  &nbsp;
                                                             </span>
                                                                <span style={{
                                                                    fontWeight: '500',fontSize:"1.2em",color: "rgb(99, 99, 103)",textOverflow:'ellipsis',
                                                                    overflow:'hidden',textAlign:'center'}}>{reserv.reservation_time}
                                                              </span>
                                                            </li>
                                                            <li>
                                                             <span style={{textAlign: 'center', fontSize: '1.3em',
                                                                 fontWeight: '700', color: '#c59d5f',
                                                                 fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                                         For:  &nbsp;
                                                             </span>
                                                                <span style={{
                                                                    fontWeight: '500',fontSize:"1.2em",color: "rgb(99, 99, 103)",textOverflow:'ellipsis',
                                                                    overflow:'hidden',textAlign:'center'}}>{reserv.duration} hour(s)
                                                              </span>
                                                            </li>
                                                            <li>
                                                             <span style={{textAlign: 'center', fontSize: '1.3em',
                                                                 fontWeight: '700', color: '#c59d5f',
                                                                 fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                                        Table:  &nbsp;
                                                             </span>
                                                                <span style={{
                                                                    fontWeight: '500',fontSize:"1.2em",color: "rgb(99, 99, 103)",textOverflow:'ellipsis',
                                                                    overflow:'hidden',textAlign:'center'}}>{reserv.position}
                                                              </span>
                                                            </li>

                                                        </ul>
                                                    </CardText>
                                                    <CardActions>
                                                        <FlatButton label="Unbook" style={{color: "red"}} onClick={this.handleDelete.bind(this,reserv.id)}/>

                                                    </CardActions>

                                                </Card>
</Col>

                                                // {/*Check for a trick to render coupons*/}

                                            )
                                        }
                                    )}
                                </Row>
                                :
                                <Card style={{margin: '5px 0'}}>
                                    <CardHeader
                                        title="YOU DONT HAVE ANY RESERVATION§"
                                    />

                                </Card>
                        }
                    </Paper>
                    </Paper>
                    </Col>

                    <Col md={4}>
                        <h3 style={{fontSize: '2em',
                            textAlign:'center',
                            fontWeight: '400',
                            letterSpacing:'0.09em',
                            margin:'20px',
                            color: '#c8d4ff',
                            fontStyle: 'italic',
                            fontFamily:'Cinzel Decorative,cursive',}}>Your Cart ({this.props.cart.length})</h3>
                        <Paper zDepth={2} style={{padding: "20px",backgroundColor:"rgba(0, 0, 0, 0.44)",marginBottom:'100px'}}>

                            <Paper zDepth={2} style={{padding: "20px"}}>

                                <Row>
                                { this.props.cart.map(
                                    reserv => {
                                        return(
                                        <Col sm={12} key={reserv[0].id}>
                                    <Card style={{margin: '5px 0', border:"#c59d5f",textOverflow:'ellipsis',
                                        overflow:'hidden',background:'rgba(255, 255, 255, 0.09)',borderRadius:'15px'}}  key={reserv[0].id}>


                                        <CardHeader
                                            style={{textAlign: 'left',fontFamily:'Source Sans Pro',
                                            }}
                                            actAsExpander={true}
                                        >
                                            <Row between="xs" >
                                                <Col sm={8}>
                                                    <div style={{fontFamily:"Source Sans Pro",color: "#c59d5f)",
                                                        fontWeight: '200',fontSize:"2.2em",letterSpacing:"0.08em",
                                                        textTransform:'uppercase',textOverflow:'ellipsis',
                                                        overflow:'hidden',maxWidth:"100%"}}>{reserv[0].name}
                                                        <div style={{
                                                            fontWeight: '400',fontSize:"0.3em",color: "#505257",textOverflow:'ellipsis',
                                                            overflow:'hidden'}}>
                                                            >{reserv[0].ingredients }</div>
                                                    </div></Col>

                                                <Col sm={4}>
                                                    <div style={{
                                                        marginTop:0,color: "rgba(243,243,243)",fontSize:'1.7em',
                                                        fontWeight: '400',textAlign:'right'
                                                    }}>
                                                        <div style={{color:'#c59d5f'}} >{reserv[0].price}</div>


                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardHeader>



                                        <CardText expandable={true}
                                                  style={{color:'rgb(130, 117, 117)',fontWeight:'400',fontSize:'1.8em',fontStyle: 'italic',
                                                      fontFamily:'Dancing Script,cursive' }}>
                                            <img src={reserv[1]?reserv[1].image_path:Logo} alt=""style={{width:'100%',height:'100%',
                                                objectFit:'contain',borderRadius:'15px'}}/>
                                            {reserv[0].description}
                                        </CardText>
                                        <CardActions>
                                            <FlatButton label="Remove" style={{color: "red"}}
                                                        style={{color: "#ff3f38"}}
                                                        icon={<i className="material-icons">clear</i>}
                                                        onClick={this.handleDeleteR.bind(this,reserv[0].id)}
                                            />

                                        </CardActions>

                                    </Card>
                                        </Col>)
                                    })
                                }</Row>
                            </Paper>
                        </Paper>

                    </Col>
                </Row>

           </Paper>
        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReserv: () => dispatch(getReservations()),
        deleteReserv:(info)=>dispatch(deleteReservation(info)),
        lookFree:(info)=>dispatch(checkFree(info)),
        reserv:(info)=>dispatch(makeReserv(info)),
        getExcep:(info)=>dispatch(getExceptionDates(info)),

        removeCart:(info)=>dispatch(removeCart(info)),
        getCart:(info)=>dispatch(getCart(info)),
        applyCart:(info)=>dispatch(applyCart(info)),


    }
};
const mapStateToProps = (state) => {
    return {
        user: state.Cl.accountName,
        freeTables :state.Cl.Ftables ,
        sub:state.Cl.subONE,
        sub2:state.Cl.subTwo,
        reservations: state.Cl.reservations,
        exceptions: state.Ad.exceptions,
        cart:state.Cl.cart,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);