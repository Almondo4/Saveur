import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getReservations,getUSERReservations,getALLReservations,validateR,removeReserv} from "../../store/Actions/ActionsSv";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {Col, Row} from "react-flexbox-grid";
import './SvStyles.css';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
class ReservValidation extends Component {
    state={
        searching:'',
    };

    componentDidMount = () => {
        const info={
            api:localStorage.getItem('api_token')
        }
        this.props.getToDays(info)
    };
    validate=(i)=>{
        const info={
            api:localStorage.getItem('api_token'),
            id:i
        }
        this.props.validateRes(info)
    }
    handleRemove=(i)=>{
        const info={
            api:localStorage.getItem('api_token'),
            id:i
        }
        this.props.removeRes(info)
    }

    handleSearch=(e)=>{
        this.setState({searching:e.target.value})
    };
    searchUserR = () => {
        const info={
            api:localStorage.getItem('api_token'),
            e:this.state.searching
        };
        this.props.getUserRes(info);
    };
    getAllReservs=()=>{
        const info= {
            api:localStorage.getItem('api_token'),
        };

        this.props.getAllRes(info);
    };
    getToDaysR = () => {
        const info={
            api:localStorage.getItem('api_token'),
        };
        this.props.getToDays(info);
    };

    render() {
        return (
            <Paper className={"menuCover"}style={{ height:"100%",marginTop:0}} >
                <h1 style={{fontSize: '4em',
                    textAlign:'center',
                    fontWeight: '400',
                    letterSpacing:'0.09em',
                    margin:'20px',
                    color: '#cda561',
                    fontStyle: 'italic',
                    fontFamily:'Cinzel Decorative,cursive',}}>Reservation Validation</h1>
                <Row >
                    <Col sm={12} md={3} mdOffset={1}
                         style={{marginTop: "80px"}} >

                        <Row>
                            <Col sm={12} md={8} >
                                <Row>
                                    <Col sm={12} md={8}>
                                        <TextField
                                            style={{marginTop: "5px",textAlign:"center",textOverflow:'ellipsis',overflow:'hidden',}}
                                            hintText="By Username.."
                                            onChange={this.handleSearch}
                                            fullWidth={true}
                                            hintStyle={{ color: '#eef8ff',}}
                                            inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                            floatingLabelStyle={{color:'#c59d5f'}}
                                        />
                                    </Col>
                                    <Col sm={12} md={4}>
                                        <RaisedButton
                                            style={{marginTop: "5px"}}
                                            // labelPosition="before"
                                            fullWidth={true}
                                            primary={true}
                                            onClick={this.searchUserR}
                                            icon={<i className="material-icons md-light">search</i>}

                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={8}>
                                <RaisedButton
                                    style={{marginTop: "5px"}}
                                    label="All Reservations"
                                    // labelPosition="before"
                                    fullWidth={true}
                                    primary={true}
                                    onClick={this.getAllReservs}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={8}>
                                <RaisedButton
                                    style={{marginTop: "5px",textOverflow:'ellipsis',overflow:'hidden',textAlign:'center'}}
                                    label="Today's Reservations"
                                    // labelPosition="before"
                                    fullWidth={true}
                                    primary={true}
                                    onClick={this.getToDaysR}
                                />
                            </Col>
                        </Row>

                    </Col>

                    {/*className={'Bgdark'}*/}
                    <Col sm={12} md={8}>
                        <Paper zDepth={2} style={{padding: "20px", backgroundColor: 'rgba(62, 60, 59, 0.17)'
                            ,marginBottom:'650px'}}>
                            <Row>
                        {

                    this.props.reservation !==[] ?
                        this.props.reservation.map(
                            reserv => {
                                const x="Reservation: "+reserv.id;
                                return (
                        <Col md={6} lg={4} key={reserv.id}>
                            <Card style={{margin: '5px 0',textAlign:'center',backgroundColor:"rgba(113, 106, 106, 0.75)",
                            borderRadius:'25px',border:'5px double #c59d5f'}} className={'cardBG4'}>
                                {/*<CardHeader*/}
                                    {/*title={x}*/}
                                    {/*subtitle={reserv.id}*/}
                                    {/*actAsExpander={true}*/}
                                    {/*showExpandableButton={true}*/}

                                {/*/>*/}
                                <CardText >
                                    <ul style={{listStyleType:'none',fontSize: '2em'}}>
                                        <li style={{marginTop:"10px"}}>
                                            <span style={{textAlign: 'center', fontSize: '1.3em', fontWeight: '700', color: '#c59d5f',
                                            fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                            Par &nbsp;
                                            </span>
                                            <span style={{
                                                fontWeight: '500',fontSize:"1.2em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                overflow:'hidden',textAlign:'center'}}>{reserv.name}
                                            </span>
                                        </li>

                                        <li style={{marginTop:"10px"}}>
                                            <span style={{textAlign: 'center', fontSize: '1.3em', fontWeight: '700', color: '#c59d5f',
                                                fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                            Le &nbsp;
                                            </span>
                                            <span style={{
                                                fontWeight: '500',fontSize:"1.2em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                overflow:'hidden',textAlign:'center'}}>{reserv.reservation_date}
                                            </span>
                                        </li>

                                        <li style={{marginTop:"10px"}}>
                                            <span style={{textAlign: 'center', fontSize: '1.3em', fontWeight: '700', color: '#c59d5f',
                                                fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                            à &nbsp;
                                            </span>
                                            <span style={{
                                                fontWeight: '500',fontSize:"1.2em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                overflow:'hidden',textAlign:'center'}}>{reserv.reservation_time}
                                            </span>
                                        </li>
                                        <li style={{marginTop:"10px"}}>
                                            <span style={{textAlign: 'center', fontSize: '1.3em', fontWeight: '700', color: '#c59d5f',
                                                fontStyle: 'italic', fontFamily:'Cinzel Decorative,cursive'}}>
                                            Pour &nbsp;
                                            </span>
                                            <span style={{
                                                fontWeight: '500',fontSize:"1.2em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                overflow:'hidden',textAlign:'center'}}>{reserv.duration}&nbsp; Heure(s).
                                            </span>
                                        </li>
                                    </ul>
                                </CardText>
                                <CardActions>
                                    <FlatButton label="Remove"
                                                style={{color: "rgb(243, 86, 23)"}}
                                                onClick={this.handleRemove.bind(this,reserv.id)}/>
                                    <FlatButton label="Validate Reservation"
                                                style={{
                                                    color: "#0ac20a"
                                                }}
                                                onClick={this.validate.bind(this,reserv.id)}/>


                                </CardActions>

                            </Card>

                        </Col>
                                )
                            }):

                        <Card style={{margin: '5px 0'}}>
                            <CardHeader
                                title="NO ONLINE RESERVATIONS ARE AWAITING TODAY§"
                            />

                        </Card>

                             }</Row>
                </Paper>
                    </Col>
                </Row>
            </Paper>
        )
    }

};
const mapDispatchToProps = (dispatch) => {
    return {
        getToDays: (i) => dispatch(getReservations(i)),
        validateRes:(i)=> dispatch(validateR(i)),
        getAllRes: (i) => dispatch(getALLReservations(i)),
        getUserRes: (i) => dispatch(getUSERReservations(i)),
        removeRes: (i) => dispatch(removeReserv(i)),

    }
};
const mapStateToProps = (state) => {
    return {
        reservation:state.Sv.Reservations}
};
export default connect(mapStateToProps, mapDispatchToProps)(ReservValidation);