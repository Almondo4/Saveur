import React, {Fragment, Component} from 'react';
import {connect} from "react-redux";

import {Col, Row} from "react-flexbox-grid";
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardTitle, CardMedia, CardText} from 'material-ui/Card';
import WOW from 'wowjs';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

import '../App.css'
import Logo from "../Components/assets/images/SaveurLogo.svg";
import pic1 from "../Components/assets/images/Stocks/luo-ping-649778-unsplash.jpg";
import pic2 from "../Components/assets/images/Stocks/bjorn-radestrom-646516-unsplash.jpg";
import Cm from "../Components/assets/images/Stocks/coming-soon.jpg";
//Collection
import vid from '../Components/assets/Videos/full video.mp4';
import {
    changeAddress, changePhone, changeSch, creatEditExcept, deleteExcept, getExceptions,
    getSchedule
} from "../store/Actions/ActionsAd";
import axios from "axios";


class Home extends Component {
    state={
        hotProds:[],
    }
    componentDidMount = () => {
        new WOW.WOW().init();
        axios.get('http://lumen.test/products/hotProducts?').then(response => {
                console.log(response.data)
               this.setState({hotProds:response.data})
            }
        )
    }

    render() {
        return (
            <div className={'home'}>
                <Row center={'xs'} className={'sec1'}>


                    <video autoPlay={true} loop={true}>
                        <source src={vid} type='video/mp4'/>
                        {/*<source src={vidWebm} type="video/webm">*/}
                    </video>
                    <div className={'overlay'}>
                        <h1 className={" wow fadeIn"} data-wow-offset="10" data-wow-duration="4s"
                            style={{fontFamily:'Cinzel Decorative,cursive',fontStyle:"italic",
                                textShadow: '0px 4px 3px rgba(0,0,0,0.4),0px 8px 13px rgba(0,0,0,0.1),0px 18px 23px rgba(0,0,0,0.1)',}}
                        >Saveur</h1>
                        <p className={" wow fadeIn"} data-wow-offset="10" data-wow-delay=".5s"
                           data-wow-delay={'2s'}
                        >'L'Art Culinaire..'</p>
                    </div>

                </Row>
                <Paper zDepth={2} style={{padding: "20px", backgroundColor: 'rgba(0, 0, 0, 0.44)'}}
                       className={"cardBG4"}>

                    <Row className={'sec2'}>
                        <Col md={12}>

                            <Row>
                                <Col md={5}>
                                    <h1 className={"secAH wow fadeInUp"}
                                        data-wow-offset="200" data-wow-duration="1.5s"
                                    >Discover Our Story</h1>

                                    <p className={"secAP wow fadeIn"}
                                       data-wow-offset="200" data-wow-duration="1s"
                                       style={{color:'rgb(239, 238, 255)',fontWeight:'400',fontSize:'2.8em',fontStyle: 'italic',
                                           fontFamily:'Dancing Script,cursive' }}>
                                        “The secret of success in life is to eat what you like and let the food
                                        fight it out inside.” -Mark Twain</p>
                                </Col>
                                <Col md={5} lg={4} xsOffset={3} className={''}
                                     className={"wow fadeIn secImgContainer"}
                                     data-wow-offset="200" data-wow-duration="1.5s">

                                </Col>
                            </Row>


                        </Col>
                    </Row>
                    <hr className={" wow fadeInUp"}
                        data-wow-offset="250" data-wow-duration="2s"/>
                    {/*Best  3*/}

                    <Row className={'best3'}>

                        <h1 style={{ fontSize:'7em',
                            fontFamily: "Herr Von Muellerhoff",
                            textAlign:'center',
                            color: '#c7b06f'}}>Discover Our Best</h1>

                        <Row center="xs">
                            {this.state.hotProds.map(prod=>{

                                return(
                                    <Col md={3} className={" wow fadeIn"}
                                         data-wow-offset="400" data-wow-duration="3s">
                                    <Card style={{borderRadius:'15px'}}>

                                    <CardMedia
                                // overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                            >
                            <img src={prod[1]?prod[1].image_path:Cm} alt="" style={{borderRadius:'15px'}}/>
                                    </CardMedia>
                                <CardTitle title={prod[0].name} subtitle={prod[0].description} />
                                <CardText>

                                </CardText>
                                    </Card>
                                </Col>
                                )


                            })}




                        </Row>

                    </Row>
                    <hr style={{top: "90px", position: 'relative'}} className={" wow fadeInUp"}
                        data-wow-offset="250" data-wow-duration="2s"/>
                    {/*Sec 3*/}
                    <Row className={'sec3'}>
                        <Col md={12}>


                            <Row>
                                <Col md={4} className={'secImgContainer2'}>


                                </Col>
                                <Col md={5} xsOffset={3}>
                                    <h1 className={"secAH wow fadeInUp"}
                                        data-wow-offset="200" data-wow-duration="1.5s"style={{ fontSize:'7em',
                                        fontFamily: "Herr Von Muellerhoff",
                                        textAlign:'center',
                                        color: '#c7b06f'}}>Discover Our Menu</h1>
                                    <p className={"secAP wow fadeIn"}
                                       data-wow-offset="200" data-wow-duration="1s"  style={{color:'rgb(239, 238, 255)',fontWeight:'400',fontSize:'2.8em',fontStyle: 'italic',
                                        fontFamily:'Dancing Script,cursive' }}>
                                        lorem Ipusm duglas fut aghile lorem
                                        Ipusm duglas fut aghile
                                        lorem Ipusm duglas fut aghile</p>
                                </Col>

                            </Row>


                        </Col>
                    </Row>

                    <Row center={'xs'} className={'excpetions'}>
                        <Col md={3}>
                            <Paper zDepth={2} style={{
                                padding: "15px",
                                marginTop: '10px',
                                backgroundColor: '#1e1f24'
                            }}>
                                <Card>

                                    <CardMedia>

                                        <img src={Cm} alt="COMING SOON"/>
                                    </CardMedia>
                                    <CardTitle title="SURPRISE!"/>
                                    <CardText className={" wow fadeIn"}
                                              data-wow-offset="200" data-wow-duration="1s">
                                        Will be soon deployed in our Web Application ! both on Desktop and Mobile!!
                                    </CardText>

                                </Card>
                            </Paper>
                        </Col>
                        <Col md={5}>
                            {
                                this.props.exceptions ?
                                    <Fragment>
                                        <Paper zDepth={2} style={{
                                            padding: "20px",
                                            marginTop: '10px',
                                            backgroundColor: '#1e1f24'
                                        }}>
                                            <h1 style={{textAlign: 'center', color: 'white'}}>Programmed Day Offs </h1>
                                            {this.props.exceptions.map(
                                                sch => {
                                                    const x = 'Expception ID ' + sch.id;
                                                    return (
                                                        <Col sm={12} key={sch.id}>
                                                            <Card style={{margin: '5px 0'}}>
                                                                {/*<CardHeader*/}
                                                                {/*title={x}*/}

                                                                {/*/>*/}
                                                                <CardText
                                                                    style={{paddingLeft: '0px', fontSize: '20px'}}>
                                                                    <p>Starting
                                                                        Day: {sch.exception_date} for {sch.duration} day(s)</p>
                                                                </CardText>


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
                                        <h4>No exceptions are programmed!</h4>


                                        {/*</Alert>*/}
                                    </Col>
                            }

                        </Col>
                        <Col md={4}>
                            {
                                this.props.coupons ?
                                    <Fragment>
                                        <Paper zDepth={2} style={{
                                            padding: "20px",
                                            marginTop: '10px',
                                            backgroundColor: '#1e1f24'
                                        }}>
                                            <h1 style={{textAlign: 'center', color: 'white'}}>Available Coupons !</h1>
                                            {this.props.coupons.map(
                                                cpn => {
                                                    const x = 'Coupon ID ' + cpn.id;
                                                    const t = cpn.type == 'percentage' ? '%' : "-";
                                                    return (
                                                        <Col>
                                                            <Card style={{margin: '5px 0'}}>
                                                                {/*<CardHeader*/}
                                                                {/*title={x}*/}

                                                                {/*/>*/}
                                                                <CardText
                                                                    style={{paddingLeft: '0px', fontSize: '15px'}}>
                                                                    <p>{cpn.value} {t} OFF!! Until {cpn.DateF} </p>
                                                                </CardText>


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
                                        <h4 className={" wow fadeIn"}
                                            data-wow-offset="10" data-wow-duration="1s">No offers are Available!</h4>


                                        {/*</Alert>*/}
                                    </Col>
                            }

                        </Col>

                    </Row>

                </Paper>
            </div>
        )
    }

};
const mapDispatchToProps = (dispatch) => {
    return {}
};
const mapStateToProps = state => {
        return {
            exceptions: state.Ad.exceptDays,
            coupons: state.Ad.coupons
        }
    }
;
export default connect(mapStateToProps, mapDispatchToProps)(Home);