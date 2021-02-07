import React, {Component, Fragment} from 'react';
import {getEvents,getCoupons,getExceptions} from "../store/Actions/ActionsAd";
import {connect} from "react-redux";
import {Col, Row} from "react-flexbox-grid";
import photo from "../Components/assets/images/Stocks/coming-soon.jpg";
//Mui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

class News extends Component{
    componentDidMount = () => {
        const info={
            api:localStorage.getItem('api_token')
        }
        this.props.getCoupons(info);
        this.props.bringEvents(info);
    };

    render(){
        return(
            <Fragment>

                <Paper className={"menuCover"}style={{ height:"110%",
                    marginBottom:'650px',backgroundAttachment:'fixed'}}>

                    <h1 style={{fontSize: '4em',
                        textAlign:'center',
                        fontWeight: '400',
                        letterSpacing:'0.09em',
                        margin:'20px',
                        paddingTop:"150px",
                        color: '#dce1ee',
                        fontStyle: 'italic',
                        fontFamily:'Cinzel Decorative,cursive',}}>News & Rewards</h1>
                    <Row center={"xs"}>

                        <Col md={8} sm={12}>
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
                    </Row>
                    <Row style={{marginTop:'50px'}}>

                        <Col md={6}>
                            <Paper zDepth={2} style={{padding: "20px",backgroundColor:'rgba(30, 31, 36, 0.37)'}}>
                                <h1 style={{fontSize: '2em',
                                    textAlign:'center',
                                    fontWeight: '400',
                                    letterSpacing:'0.09em',
                                    margin:'20px',
                                    color: '#c8d4ff',
                                    fontStyle: 'italic',
                                    fontFamily:'Cinzel Decorative,cursive',}}>Exceptions</h1>
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


                                                </Card>
                                            </Col>)})}


                            </Paper>
                        </Col>

                        <Col md={5} mdOffset={1}>

                            <Paper zDepth={2} style={{padding: "20px",backgroundColor:'rgba(30, 31, 36, 0.37)'}}>
                                <h1 style={{fontSize: '2em',
                                    textAlign:'center',
                                    fontWeight: '400',
                                    letterSpacing:'0.09em',
                                    margin:'20px',
                                    color: '#c8d4ff',
                                    fontStyle: 'italic',
                                    fontFamily:'Cinzel Decorative,cursive',}}>Available Coupons</h1>
                                {this.props.coupons.map(
                                    cpn => {
                                        return (
                                            <Col sm={12} style={{marginBottom: "20px"}}>
                                                <Card className={"cardBG2"}>


                                                    {/*<CardHeader*/}
                                                    {/*style={{padding:0,fontFamily:'Source Sans Pro',*/}
                                                    {/*}}*/}
                                                    {/**/}
                                                    {/*>*/}
                                                    <CardMedia
                                                        actAsExpander={true}
                                                        // overlay={<CardTitle title={ev[0].description} subtitle={dateS} />}
                                                    >
                                                        <img src={cpn[1]?cpn[1].image_path:photo}
                                                             style={{maxHeight:'200px'}}
                                                        />
                                                    </CardMedia>

                                                    {/*</CardHeader>*/}




                                                    <CardText expandable={true}>
                                                        <ul style={{listStyleType:'none'}}>
                                                            <li><span style={{textAlign: 'center',
                                                                fontSize: '1.3em',
                                                                fontWeight: '700',
                                                                color: '#c59d5f',
                                                                fontStyle: 'italic',
                                                                fontFamily:'Cinzel Decorative,cursive'}}>Value: &nbsp;</span>
                                                                <span style={{
                                                                    fontWeight: '500',fontSize:"1.2em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                                    overflow:'hidden',textAlign:'center'}}> {cpn[0].value}</span></li>

                                                            <li><span style={{textAlign: 'center',
                                                                fontSize: '1.3em',
                                                                fontWeight: '700',
                                                                color: '#c59d5f',
                                                                fontStyle: 'italic',
                                                                fontFamily:'Cinzel Decorative,cursive'}}>Type: &nbsp;</span>
                                                                <span style={{
                                                                    fontWeight: '500',fontSize:"1.2em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                                    overflow:'hidden',textAlign:'center'}}> {cpn[0].type}</span></li>

                                                            <li><span style={{textAlign: 'center',
                                                                fontSize: '1.3em',
                                                                fontWeight: '700',
                                                                color: '#c59d5f',
                                                                fontStyle: 'italic',
                                                                fontFamily:'Cinzel Decorative,cursive'}}>Stackable? &nbsp;</span>
                                                                <span style={{
                                                                    fontWeight: '500',fontSize:"1.2em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                                    overflow:'hidden',textAlign:'center'}}> {cpn[0].stackable=="1"?
                                                                    <i class="material-icons" style={{top:'4px',position:"relative"}}>done</i>:
                                                                    <i className="material-icons" style={{top:'4px',position:"relative"}}>remove_circle</i>

                                                                }</span></li></ul>
                                                    </CardText>

                                                </Card>
                                            </Col>
                                        )
                                    }
                                )}</Paper>

                        </Col>
                    </Row>



                </Paper>

            </Fragment>)
                }

}
const mapDispatchToProps = (dispatch) => {
    return {
        getCoupons: (i) => dispatch(getCoupons(i)),
        getExcep:(info) => dispatch(getExceptions(info)),
        bringEvents: (i) => dispatch(getEvents(i)),
    }
};
const mapStateToProps = (state) => {
    return {
        coupons:state.Cl.coupons,
        exceptions: state.Ad.exceptDays,
        events: state.Ad.events,

    }

};
export default connect(mapStateToProps, mapDispatchToProps)(News);
