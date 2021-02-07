import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getSchedule, changePhone, changeAddress,
    getExceptions,deleteExcept,changeSch,creatEditExcept} from "../../store/Actions/ActionsAd";
import {Col, Row} from "react-flexbox-grid";
import "../../App.css";
//Mui
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from "moment/moment";


const styles = {
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};

class ReservValidation extends Component {
    state = {
        phone: '',
        address: '',
        Open:'',
        OpenH:'',
        CloseH:'',
        Close:'',
        schId: '',
        evDec: '',
        schStart: '',
        duration: '',

    };

    componentDidMount = () => {
        const info={
            api:localStorage.getItem('api_token')
        }
        console.log(info)
        this.props.getSch(info)
        this.props.getExcep(info)
    };
    handlePhoneChange = (event) => {
        this.setState({phone: event.target.value})
    };
    handleAddressChange = (event) => {
        this.setState({address: event.target.value})
    };
    handleSchIdChange = (event, index, value) => this.setState({schId:value});
    handleStartChange = (event, date) => {
        const d= moment(date).format('YYYY-MM-DD ');
        this.setState({schStart: d})
    };
    handleDurIDChange = (event) => {
        this.setState({duration: event.target.value})
    };
    handleSubmitInfo = () => {
        const info={
            opening_day:this.state.Open,
            closing_day:this.state.Close,
            opening_time:this.state.OpenH,
            closing_time:this.state.CloseH,
            api_token: localStorage.getItem('api_token'),

        }
        this.props.changeAd(this.state.address);
        // console.log(this.state.address);
        this.props.changePh(this.state.phone);
        // console.log(this.state.phone);
        this.props.changeSch(info)
    };

    handleSubmitInfoExcept = () => {
        const info={
            id:this.state.schId,
            exception_date:this.state.schStart,
            duration:this.state.duration,
            api_token: localStorage.getItem('api_token'),

        };

        this.props.CEX(info)
    };

    handleOpenChange = (event, index, value) => this.setState({Open:value});

    handleCloseChange = (event, index, value) => this.setState({Close:value});

    handleHourStartChange=(event,time)=>{
        const t= moment(time).format('HH:mm:ss');
        this.setState({OpenH:t})
        console.log(this.state.reservHour)
    };
    handleHourEndChange=(event,time)=>{
        const t= moment(time).format('HH:mm:ss');
        this.setState({CloseH:t})
        console.log(this.state.reservHour)
    };
    handleDelete = (id) => {
        const info = {
            api_token: localStorage.getItem('api_token'),
            idS: id

        }
        this.props.deleteExcep(info);
    };

    render() {
        let x = new Date();
        return (
            <Paper className={"menuCover"}style={{ height:"110%",
                marginBottom:'650px',backgroundAttachment:'fixed'}}>
                {/*<h1 style={{textAlign: 'center'}}>Schedule</h1>*/}
                <h1 style={{fontSize: '4em',
                    textAlign:'center',
                    fontWeight: '400',
                    letterSpacing:'0.09em',
                    margin:'20px',
                    color: '#cda561',
                    fontStyle: 'italic',
                    fontFamily:'Cinzel Decorative,cursive',}}>Schedule</h1>
                <Row center={'xs'} >

                    <Col md={5} mdOffset={1} className={'FooterAlike'}>
                        <Row>
                            <Col sm={12}>
                                <p>{this.props.address}</p>
                                <p>RESERVATIONS NUMBER: {this.props.phone} </p>
                                <p style={{color: "#c59d5f"}}>WORKING HOURS:</p>
                                <p><span style={{textTransform:'Uppercase'}}>{this.props.OP}-{this.props.CP}</span>: From {this.props.whO} to {this.props.whC}</p>
                            </Col>
                        </Row>
                        <Row start={'xs'}>
                            <Col sm={12}>
                                {
                                    this.props.exceptions ?
                                        <Fragment>
                                            <Paper zDepth={2} style={{
                                                padding: "20px",
                                                marginTop: '10px',
                                                backgroundColor:'rgba(162, 157, 152, 0.13)'
                                            }}>
                                                <h1 style={{textAlign: 'center', color: 'white'}}>Exceptions</h1>
                                                {this.props.exceptions.map(
                                                    sch => {
                                                        return (
                                                            <Col sm={12} key={sch.id}>
                                                                <Card style={{margin: '5px 0'}} className={"cardBG"}>
                                                                    <div style={{ fontSize: '1.5em',
                                                                        fontWeight: '900',
                                                                        color: '#c59d5f',
                                                                        fontStyle: 'italic',
                                                                        fontFamily:'Cinzel Decorative,cursive',
                                                                    paddingRight:'5px'}}>
                                                                       {sch.id}

                                                                    </div>
                                                                    <CardText >
                                                                        <ul style={{listStyleType: 'none'}}>
                                                                            <li><span style={{textAlign: 'center',
                                                                                fontSize: '1.3em',
                                                                                fontWeight: '700',
                                                                                color: '#c59d5f',
                                                                                fontStyle: 'italic',
                                                                                fontFamily:'Cinzel Decorative,cursive'}}>Starting Day: &nbsp;</span>
                                                                                <span style={{
                                                                                    fontWeight: '500',fontSize:"1.1em",color: "#6a6b72",textOverflow:'ellipsis',
                                                                                    overflow:'hidden',textAlign:'center'}}> {sch.exception_date}</span></li>

                                                                            <li><span style={{textAlign: 'center',
                                                                                fontSize: '1.3em',
                                                                                fontWeight: '700',
                                                                                color: '#c59d5f',
                                                                                fontStyle: 'italic',
                                                                                fontFamily:'Cinzel Decorative,cursive'}}>Duration: &nbsp;</span>
                                                                                <span style={{
                                                                                    fontWeight: '500',fontSize:"1.1em",color: "#6a6b72",textOverflow:'ellipsis',
                                                                                    overflow:'hidden',textAlign:'center'}}> {sch.duration} </span></li>


                                                                        </ul>
                                                                    </CardText>
                                                                    <CardActions>
                                                                        <FlatButton label="Delete"
                                                                                    style={{
                                                                                        color: "red"
                                                                                    }}
                                                                                    icon={<i
                                                                                        className="material-icons md-light">clear</i>}
                                                                                    onClick={this.handleDelete.bind(this,sch.id)}/>


                                                                    </CardActions>

                                                                </Card>
                                                            </Col>
                                                        )
                                                    }
                                                )}
                                            </Paper>
                                        </Fragment>
                                        :
                                        <Col sm={6}>
                                            {/*<Alert bsStyle="danger" onDismiss={this.handleDismiss}>*/}
                                            <h4>Oh snap! You got an error!</h4>
                                            <p>
                                                {this.props.Error}
                                            </p>

                                            {/*</Alert>*/}
                                        </Col>
                                }

                            </Col>
                        </Row>

                    </Col>
                    <Col md={4} mdOffset={1} >
                        <Paper zDepth={2} style={{padding: "20px",
                            backgroundColor:"rgba(162, 157, 152, 0.13)",textAlign:'left',border:'5px solid #cda561'}}>
                            <h1 style={{fontSize: '2em',
                                textAlign:'center',
                                fontWeight: '400',
                                letterSpacing:'0.09em',
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                fontStyle: 'italic',
                                fontFamily:"Source Sans Pro",}}>MODIFY INFO</h1>

<Row>
    <Col sm={12}>
    <Col>
                            <TextField
                                hintText="ENTER NEW ADRESS OR LEAVE EMPTY"
                                value={this.state.address}
                                floatingLabelText="ADDRESS"
                                onChange={this.handleAddressChange}
                                fullWidth={true}/>
    </Col>
    <Col>
                            <TextField
                                hintText="ENTER NEW PH.NUMBER OR LEAVE EMPTY"
                                value={this.state.phone}
                                floatingLabelText="PHONE NUMBER"
                                onChange={this.handlePhoneChange}
                                fullWidth={true}/>
    </Col>
                            <Col>
                                <Row >
                                    <Col md={6}>
                                        <SelectField
                                        floatingLabelText="Opening Day"
                                        value={this.state.Open}
                                        onChange={this.handleOpenChange}
                                        fullWidth={true}
                                        hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                        labelStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                        floatingLabelStyle={{color:'#c59d5f'}}
                                        >
                                        <MenuItem value={'saturday'} primaryText="Saturday" />
                                        <MenuItem value={'sunday'} primaryText="Sunday" />
                                        <MenuItem value={'monday'} primaryText="Monday" />
                                        <MenuItem value={'tuesday'} primaryText="Tuesday" />
                                        <MenuItem value={'wednesday'} primaryText="Wednesday" />
                                        <MenuItem value={'thursday'} primaryText="Thursday"  />
                                        <MenuItem value={'friday'} primaryText="Friday" />

                                    </SelectField></Col>

                                    <Col md={6}>
                                        <SelectField
                                        floatingLabelText="Closing Day"
                                        value={this.state.Close}
                                        onChange={this.handleCloseChange}
                                        fullWidth={true}
                                        hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                        labelStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                        floatingLabelStyle={{color:'#c59d5f'}}
                                    >
                                            <MenuItem value={'saturday'} primaryText="Saturday" />
                                            <MenuItem value={'sunday'} primaryText="Sunday" />
                                            <MenuItem value={'monday'} primaryText="Monday" />
                                            <MenuItem value={'tuesday'} primaryText="Tuesday" />
                                            <MenuItem value={'wednesday'} primaryText="Wednesday" />
                                            <MenuItem value={'thursday'} primaryText="Thursday"  />
                                            <MenuItem value={'friday'} primaryText="Friday" />

                                    </SelectField></Col>
                                </Row>
                            </Col>
                       <Col>
                                <Row style={{marginTop:'15px'}}>
                                    <Col md={6} >
                                        {/*//Hour*/}
                                        <TimePicker
                                            hintText=" OpeningTime"
                                            minutesStep={15}
                                            fullWidth={true}
                                            autoOk={true}
                                            onChange={this.handleHourStartChange}
                                            hintStyle={{ color: '#c59d5f', fontSize: '20px' }}
                                            inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                            floatingLabelStyle={{color:'#c59d5f'}}


                                        /></Col>
                                        <Col md={6} >
                                            {/*//Hour*/}
                                            <TimePicker
                                                hintText="ClosingTime"
                                                minutesStep={15}
                                                fullWidth={true}
                                                autoOk={true}
                                                onChange={this.handleHourEndChange}
                                                hintStyle={{ color: '#c59d5f', fontSize: '20px' }}
                                                inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                                floatingLabelStyle={{color:'#c59d5f'}}


                                            />
                                        </Col>

                                </Row>

                            </Col>

                            <RaisedButton label="Submit New Info" primary={true}
                                          onClick={this.handleSubmitInfo}
                                          fullWidth={true} style={{marginTop: '50px'}}/>
    </Col>
</Row>
                            <hr/>

                            <h3 style={{fontSize: '2em',
                                textAlign:'center',
                                fontWeight: '400',
                                letterSpacing:'0.09em',
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                fontStyle: 'italic',
                                fontFamily:"Source Sans Pro",}}>ADD OR MODIFY EXCEPTIONS</h3>
<Row>
    <Col sm={12}>
        <Col md={6}>
                            <SelectField
                                floatingLabelText="Exception ID"
                                value={this.state.schId}
                                onChange={this.handleSchIdChange}
                                fullWidth={true}
                                autoOk={true}
                                // fullWidth={true}

                                selectedMenuItemStyle={{color: '#c59d5f', fontSize: '20px' }}
                                labelStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                floatingLabelStyle={{color:'#c59d5f'}}
                            >
                                {this.props.exceptions.map(dish=>{
                                    return(
                                        <MenuItem value={dish.id} primaryText={dish.id} key={dish.id}/>

                                    )}
                                )}

                            </SelectField>
        </Col>
        <Col>
                            <DatePicker minDate={x} hintText="Starting Date " fullWidth={true}
                                        onChange={this.handleStartChange}
                                        hintStyle={{ color: '#c59d5f', fontSize: '20px' }}
                                        inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                        floatingLabelStyle={{color:'#c59d5f'}}
                                        style={{marginTop: '20px'}}
                            />
        </Col>
        <Col>
                            <TextField
                                hintText="For How Long?"
                                value={this.state.duration}
                                floatingLabelText="duration"
                                onChange={this.handleDurIDChange}
                                type={"number"}
                                fullWidth={true}
                                hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                floatingLabelStyle={{color:'#c59d5f'}}/>

        </Col>
        <Col>

                            <RaisedButton label="Submit Exception" primary={true}
                                          onClick={this.handleSubmitInfoExcept}
                                          fullWidth={true} style={{marginTop: '50px'}}/>
        </Col>
    </Col>
</Row>

                        </Paper>


                    </Col>


                </Row>



            </Paper>
        )
    }

};
const mapDispatchToProps = (dispatch) => {
    return {
        getSch: (info) => dispatch(getSchedule(info)),
        changeSch: (info) => dispatch(changeSch(info)),
        CEX:(info)=>dispatch(creatEditExcept(info)),
        getExcep:(info) => dispatch(getExceptions(info)),
        deleteExcep:(info)=>dispatch(deleteExcept(info)),
        changePh: (ph) => dispatch(changePhone(ph)),
        changeAd: (ad) => dispatch(changeAddress(ad))
    }
};
const mapStateToProps = (state) => {
    return {
        exceptions: state.Ad.exceptDays,
        whO: state.Ad.openninghour,
        whC: state.Ad.closingHour,
        OP:state.Ad.openingDay,
        CP:state.Ad.closingDay,
        address: state.Ad.address,
        phone: state.Ad.phone
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ReservValidation);

//22 Royal Street, Les Combattants Avenue, Constantine
//
// +213 25 187 678