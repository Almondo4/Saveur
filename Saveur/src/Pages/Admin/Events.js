import React, {Component, Fragment} from 'react';
import {getEvents,getEventsId,creatEditEvent,deleteEvent} from "../../store/Actions/ActionsAd";
import {connect} from "react-redux";
import {Col, Row} from "react-flexbox-grid";

// Mui
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from "moment/moment";

import photo from "../../Components/assets/images/Stocks/coming-soon.jpg";
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

class Events extends Component {
    state = {
        eventsId: [],
        evenId: '',
        evName: '',
        evDec: '',
        evStart: null,
        evEnd: null,
        evImg: null,
        gift:'',
        discount:'',
    };

    componentDidMount = () => {
        const info= {
            api:localStorage.getItem('api_token'),
        };

        this.props.bringEvents(info);

        // console.log(this.props.eventsId)

    };
    handleVentIDChange = (event, index, value) => this.setState({evenId:value});

    handleVentChange = (event) => {
        this.setState({evName: event.target.value})
    };
    handleDecChange = (event) => {
        this.setState({evDec: event.target.value})
    };

    handleImgChange = (event) => {

        this.setState({evImg:  event.target.files[0]})
        console.log(this.state.evImg)
    };
    handleStartChange = (event, date) => {
        const d= moment(date).format('YYYY-MM-DD ');
        console.log(d)
        this.setState({evStart: d})
    };
    handleNDChange = (event, date) => {
        const d= moment(date).format('YYYY-MM-DD ');
        console.log(d)
        this.setState({evEnd: d})
    };

    handleGiftChange = (event) => {
        this.setState({gift: event.target.value})
    };

    handleDiscountChange = (event) => {
        this.setState({discount: event.target.value})
    };

    handleSubmit = () => {

        const info = new FormData();
        info.append('id',this.state.evenId)
        info.append('api',localStorage.getItem('api_token'))
        info.append('evName',this.state.evName)
        info.append('description',this.state.evName)
        info.append('starting',this.state.evStart)
        info.append('ending',this.state.evEnd)
        info.append('eventPicture',this.state.evImg)
        info.append('gift',this.state.gift)
        info.append('discount',this.state.discount)
        //     {
        //
        //     api:localStorage.getItem('api_token'),
        //     id:this.state.evenId?this.state.evenId:null,
        //     evName: this.state.evName,
        //     description: this.state.evDec,
        //     starting: this.state.evStart,
        //     ending: this.state.evEnd,
        //     eventPicture: this.state.evImg,
        //     gift:this.state.gift,
        //     discount:this.state.discount,
        //
        // };
        this.props.CEE(info);
    };
    handleDelete = (id) => {
        const info = {
            api_token: localStorage.getItem('api_token'),
            idT: id

        }
    this.props.deleteE(info);
    }


    render() {
        let x = new Date();
        return (
            <Paper className={"menuCover"}style={{ height:"110%",
                marginBottom:'650px',backgroundAttachment:'fixed'}}>
                <h1 style={{fontSize: '4em',
                    textAlign:'center',
                    fontWeight: '400',
                    letterSpacing:'0.09em',
                    margin:'20px',
                    color: '#cda561',
                    fontStyle: 'italic',
                    fontFamily:'Cinzel Decorative,cursive',}}>Events</h1>
                {/*<h1 style={{textAlign:'center',marginBottom:'50px'}}>Events</h1>*/}


                {
                    <Row>

                        <Col md={6} sm={12}>
                            <Paper zDepth={2} style={{padding: "20px",backgroundColor:'rgba(30, 31, 36, 0.37)'}}>
                            {this.props.events ?
                                <Fragment>
                                    {this.props.events.map(
                                        ev => {
                                            let dateS="";
                                            if (ev[0]){
                                                dateS="From "+ev[0].starting+" to "+ev[0].starting+"."
                                            }
                                            else {
                                                dateS="From "+ev.starting+" to "+ev.starting+"."
                                            }

                                            return (
                                                <Col sm={12} style={{marginBottom: "20px"}} key={ev[0].id}>
                                                    <Card className={"cardBG2"}>
                                                        <div style={{paddingRight:"16px", marginBottom:"0px"}}>
                                                            {/*title={ev.id}*/}
                                                            {/*// subtitle={dateS}*/}

                                                        {/*/>*/}
                                                        <p><span style={{textAlign: 'center',
                                                            fontSize: '2.3em',
                                                            fontWeight: '700',
                                                            color: '#c59d5f',
                                                            fontStyle: 'italic',
                                                            fontFamily:'Cinzel Decorative,cursive'}}>{ev[0].id}. </span> </p>
                                                        </div>
                                                        <CardMedia
                                                            overlay={<CardTitle title={ev[0].description} subtitle={dateS} />}
                                                        >
                                                            <img src={ev[1]?ev[1].image_path:photo}
                                                                 alt="" />
                                                        </CardMedia>
                                                        {/*<CardTitle title="Card title" subtitle="Card subtitle" />*/}
                                                        <CardText>
                                                            <ul style={{listStyleType:'none'}}>
                                                                {/*<li><span style={{textAlign: 'center',*/}
                                                                    {/*fontSize: '1.3em',*/}
                                                                    {/*fontWeight: '700',*/}
                                                                    {/*color: '#c59d5f',*/}
                                                                    {/*fontStyle: 'italic',*/}
                                                                    {/*fontFamily:'Cinzel Decorative,cursive'}}>Description: </span><br/>{ev.description}</li>*/}

                                                                <li><span style={{textAlign: 'center',
                                                                    fontSize: '1.3em',
                                                                    fontWeight: '700',
                                                                    color: '#c59d5f',
                                                                    fontStyle: 'italic',
                                                                    fontFamily:'Cinzel Decorative,cursive'}}>Possible Gifts: <br/></span>
                                                                    <span style={{
                                                                        fontWeight: '500',fontSize:"0.9em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                                        overflow:'hidden',textAlign:'center'}}> {ev[0].gift}</span></li>
                                                                <li style={{marginTop:"10px"}}><span style={{textAlign: 'center',
                                                                    fontSize: '1.3em',
                                                                    fontWeight: '700',
                                                                    color: '#c59d5f',
                                                                    fontStyle: 'italic',
                                                                    fontFamily:'Cinzel Decorative,cursive'}}>Discount:  <br/> </span>
                                                                    <span style={{
                                                                        fontWeight: '500',fontSize:"0.9em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                                        overflow:'hidden',textAlign:'center'}}>{ev[0].discount}%</span> </li>
                                                            </ul>

                                                        </CardText>
                                                        <CardActions>
                                                            <FlatButton label="Remove" style={{color: "red"}}
                                                                        style={{color: "#ffa45b"}}
                                                                        icon={<i className="material-icons">clear</i>}
                                                                        onClick={this.handleDelete.bind(this, ev[0].id)}
                                                            />

                                                        </CardActions>
                                                    </Card>
                                                </Col>
                                            )
                                        }
                                    )}
                                </Fragment>
                                :
                                <p>No events.</p>
                            }
                            </Paper>
                        </Col>

                        <Col sm={12} md={4} mdOffset={1} className={"ModMenu"} style={{zIndex: "20"}}>

                            <Paper zDepth={2} style={{padding: "20px",
                                backgroundColor:"rgba(162, 157, 152, 0.13)",border:'5px solid #cda561'}}>
                                <h1 style={{fontSize: '2em',
                                    textAlign:'center',
                                    fontWeight: '400',
                                    letterSpacing:'0.09em',
                                    textTransform: 'uppercase',
                                    color: '#ffffff',
                                    fontStyle: 'italic',
                                    fontFamily:"Source Sans Pro",}}>ADD OR MODIFY</h1>

                                <SelectField
                                    floatingLabelText="Only if you want to modify"
                                    value={this.state.evenId}
                                    onChange={this.handleVentIDChange}
                                    hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                    labelStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                    floatingLabelStyle={{color:'#c59d5f'}}
                                    // selectedOptionStyle={{color:'#d0d0d0'}}
                                >
                                    {this.props.events.map(even=>{
                                        return(
                                        <MenuItem value={even[0].id} primaryText={even[0].id} key={even[0].id}/>

                                        )}
                                       )}

                                </SelectField>
                                {/*<TextField*/}
                                    {/*hintText="Only if you want to modify"*/}
                                    {/*value={this.state.evenID}*/}
                                    {/*floatingLabelText="Event ID"*/}
                                    {/*onChange={this.handleVentIDChange}*/}
                                    {/*fullWidth={true}*/}
                                    {/*hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}*/}
                                    {/*inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}*/}
                                    {/*floatingLabelStyle={{color:'#c59d5f'}}/>*/}

                                <TextField
                                    hintText="Event Name"
                                    value={this.state.evName}
                                    floatingLabelText="Event Name"
                                    onChange={this.handleVentChange}
                                    fullWidth={true}
                                    hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                    inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                    floatingLabelStyle={{color:'#c59d5f'}}/>

                                <TextField
                                    hintText="Event Description"
                                    value={this.state.evDec}
                                    floatingLabelText="Event Description"
                                    onChange={this.handleDecChange}
                                    multiLine={true}
                                    fullWidth={true}
                                    hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                    textareaStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                    floatingLabelStyle={{color:'#c59d5f'}}/>

                                <Row between={"xs"}>
                                    <Col lg={5}>
                                        <DatePicker minDate={x} hintText="Starting Date " fullWidth={true}
                                                    onChange={this.handleStartChange}
                                                    fullWidth={true}
                                                    style={{marginTop: '20px'}}
                                                    hintStyle={{ color: '#c59d5f', fontSize: '20px' }}
                                                    inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                                    floatingLabelStyle={{color:'#c59d5f'}}
                                        />
                                    </Col>
                                    <Col lg={5}>
                                        <DatePicker minDate={x} hintText="Ending Date " fullWidth={true}
                                                    onChange={this.handleNDChange}
                                                    fullWidth={true}
                                                    style={{marginTop: '20px'}}
                                                    hintStyle={{ color: '#c59d5f', fontSize: '20px' }}
                                                    inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                                    floatingLabelStyle={{color:'#c59d5f'}}
                                        />
                                    </Col>
                                </Row>
                                <Row between={"xs"}>
                                    <Col lg={5}>
                                        <TextField
                                            hintText="gift"
                                            value={this.state.gift}
                                            floatingLabelText="Gift"
                                            onChange={this.handleGiftChange}

                                            fullWidth={true}
                                            hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                            inputStyle={{ color: 'white', fontSize: '20px' }}
                                            floatingLabelStyle={{color:'#c59d5f'}}/>
                                    </Col>
                                    <Col lg={5}>
                                        <TextField
                                            hintText="Discount"
                                            value={this.state.discount}
                                            floatingLabelText="Discount"
                                            onChange={this.handleDiscountChange}
                                            type={"number"}
                                            fullWidth={true}

                                            hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                            inputStyle={{ color: 'rgb(243, 233, 223)', fontSize: '20px' }}
                                            floatingLabelStyle={{color:'#c59d5f'}}/>
                                    </Col>
                                </Row>

                                <RaisedButton
                                    label="Choose an Image"
                                    labelPosition="before"
                                    containerElement="label"
                                    style={{marginTop: '50px'}}

                                >
                                    <input type="file" style={styles.exampleImageInput}
                                           onChange={this.handleImgChange}
                                           hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                           inputStyle={{ color: 'white', fontSize: '20px' }}
                                           floatingLabelStyle={{color:'#c59d5f'}}
                                    />
                                </RaisedButton>
                                <TextField
                                    style={{marginLeft:'10px'}}
                                    value={this.state.evImg}
                                    readOnly={true}
                                    hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                    inputStyle={{ color: 'white', fontSize: '20px' }}
                                    floatingLabelStyle={{color:'#c59d5f'}}
                                />
                                <RaisedButton label="Submit"primary={true}
                                              onClick={this.handleSubmit}
                                              fullWidth={true} style={{marginTop: '50px'}}/>

                            </Paper>

                        </Col>


                    </Row>
                }
                </Paper>

        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        bringEvents: (i) => dispatch(getEvents(i)),
        // bringEventsId:()=>dispatch(getEventsId()),
        CEE:(i)=>dispatch(creatEditEvent(i)),
        deleteE: (i) =>dispatch(deleteEvent(i))
    }
};
const mapStateToProps = (state) => {
    return {
        events: state.Ad.events,
        // eventsId:state.Ad.eventsId
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Events);