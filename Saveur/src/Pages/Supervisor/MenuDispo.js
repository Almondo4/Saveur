import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getMenu} from '../../store/Actions/Actions';
import {makeAvailable,makeOut} from '../../store/Actions/ActionsSv';
//Mui
import {Col, Row} from "react-flexbox-grid";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import Logo from "../../Components/assets/images/Stocks/coming-soon.jpg";
import WOW from 'wowjs';

class MenuDisp extends Component {
    componentDidMount = () => {
        new WOW.WOW().init();
        const info= {
            api:localStorage.getItem('api_token'),
        };
        this.props.getmenu(info);
    };

    handleOut = (id) => {
        const info = {
            api_token: localStorage.getItem('api_token'),
            idT: id

        }
        this.props.out(info);
    }

    handleAvailable= (id) => {
        const info = {
            api_token: localStorage.getItem('api_token'),
            idT: id

        }
        this.props.available(info);
    }


    render() {
        return (

            <Paper className={"menuCover"} style={{ height:"110%",marginTop:0,backgroundAttachment:'fixed'}} >
                < Row center="xs"><Col sm={12} md={10} >
                    <h3
                        style={{fontSize: '4em',
                            textAlign:'center',
                            fontWeight: '400',
                            letterSpacing:'0.09em',
                            margin:'20px',
                            color: '#cda561',
                            fontStyle: 'italic',
                            fontFamily:'Cinzel Decorative,cursive',}}
                    >Menu</h3>
                    <Paper zDepth={2} style={{padding: "20px",backgroundColor: 'rgba(41, 41, 47, 0.68)'}} >
                        <Row center="xs" between="xs" style={{opacity:'1'}}>
                            <Col sm={12} md={5} style={{border:'10px solid #c7b06f'}}>
                                <h3
                                    style={{fontSize: '2em',
                                        fontWeight: '400',
                                        letterSpacing:'0.09em',
                                        textTransform: 'uppercase',
                                        color: '#ffffff',
                                        fontStyle: 'italic',
                                        fontFamily:'Cinzel Decorative,cursive'}}>Starters</h3>
                                <hr className={" wow fadeInUp"}
                                    data-wow-offset="250" data-wow-duration="2s"/>
                                {this.props.menu.map(
                                    reserv => {
                                        if(reserv[0].category==='starter'){
                                            return(<Col sm={12} >
                                                <Fragment>
                                                    <Card style={{margin: '5px 0', border:"#c59d5f",textOverflow:'ellipsis',
                                                        overflow:'hidden',background:'rgba(255, 255, 255, 0.09)',borderRadius:'15px'}} >


                                                        <CardHeader
                                                            style={{textAlign: 'left',fontFamily:'Source Sans Pro',
                                                            }}
                                                            actAsExpander={true}
                                                        >
                                                            <Row between="xs" >
                                                                <Col sm={8}>
                                                                    <div style={{fontFamily:"Source Sans Pro",color: "rgba(243,243,243)",
                                                                        fontWeight: '200',fontSize:"2.2em",letterSpacing:"0.08em",
                                                                        textTransform:'uppercase',textOverflow:'ellipsis',
                                                                        overflow:'hidden',maxWidth:"100%"}}>{reserv[0].name}
                                                                        <div style={{
                                                                            fontWeight: '400',fontSize:"0.3em",color: "#bbbfc5",textOverflow:'ellipsis',
                                                                            overflow:'hidden'}}>
                                                                            >{reserv[0].ingredients }</div>
                                                                    </div></Col>

                                                                <Col sm={4}>
                                                                    <div style={{
                                                                        marginTop:0,color: "rgba(243,243,243)",fontSize:'1.7em',
                                                                        fontWeight: '400',textAlign:'right'
                                                                    }}>
                                                                        <div style={{color:'#c59d5f'}} >{reserv[0].price} DZD</div>


                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>



                                                        <CardText expandable={true}>
                                                            <img src={reserv[1]?reserv[1].image_path:Logo} alt=""style={{width:'100%',height:'100%',
                                                                objectFit:'contain',borderRadius:'15px'}}/>
                                                            {reserv[0].description}
                                                        </CardText>
                                                        <CardActions style={{
                                                            // left: '360px', position: 'relative'
                                                            height:"30px"
                                                        }}>

                                                            <FlatButton label="Out Of Stock"
                                                                        style={{color: "rgb(243, 86, 23)"}}
                                                                        onClick={this.handleOut.bind(this,reserv[0].id)}/>
                                                            <FlatButton label="Available"
                                                                        style={{color: "#0ac20a"}}
                                                            onClick={this.handleAvailable.bind(this,reserv[0].id)}/>

                                                        </CardActions>
                                                    </Card>

                                                </Fragment>

                                            </Col>)
                                        }
                                    }
                                )}
                            </Col>
                            <Col sm={12} md={5} style={{border:'10px solid #c7b06f'}}>
                                <h3
                                    style={{fontSize: '2em',
                                        fontWeight: '400',
                                        letterSpacing:'0.09em',
                                        textTransform: 'uppercase',
                                        color: '#ffffff',
                                        fontStyle: 'italic',
                                        fontFamily:'Cinzel Decorative,cursive'}}>Mains</h3>
                                <hr className={" wow fadeInUp"}
                                    data-wow-offset="250" data-wow-duration="2s"/>
                                {this.props.menu.map(
                                    reserv => {
                                        if(reserv[0].category==='main'){
                                            return(<Col sm={12} >
                                                <Fragment>
                                                    <Card style={{margin: '5px 0', border:"#c59d5f",textOverflow:'ellipsis',
                                                        overflow:'hidden',borderRadius:'15px',background:'rgba(255, 255, 255, 0.09)'}}  className={"cardBG3"}>


                                                        <CardHeader
                                                            style={{textAlign: 'left',fontFamily:'Source Sans Pro',
                                                            }}
                                                            actAsExpander={true}
                                                        >
                                                            <Row between="xs" >
                                                                <Col sm={8}>
                                                                    <div style={{fontFamily:"Source Sans Pro",color: "rgba(243,243,243)",
                                                                        fontWeight: '200',fontSize:"2.2em",letterSpacing:"0.08em",
                                                                        textTransform:'uppercase',textOverflow:'ellipsis',
                                                                        overflow:'hidden',maxWidth:"100%"}}>{reserv[0].name}
                                                                        <div style={{
                                                                            fontWeight: '400',fontSize:"0.3em",color: "#bbbfc5",textOverflow:'ellipsis',
                                                                            overflow:'hidden'}}>
                                                                            >{reserv[0].ingredients }</div>
                                                                    </div></Col>

                                                                <Col sm={4}>
                                                                    <div style={{
                                                                        marginTop:0,color: "rgba(243,243,243)",fontSize:'1.7em',
                                                                        fontWeight: '400',textAlign:'right'
                                                                    }}>
                                                                        <div style={{color:'#c59d5f'}}>{reserv[0].price} DZD</div>


                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>



                                                        <CardText expandable={true}>
                                                            <img src={reserv[1]?reserv[1].image_path:Logo} alt=""style={{width:'100%',height:'100%',
                                                                objectFit:'contain',borderRadius:'15px'}}/>
                                                            {reserv[0].description}
                                                        </CardText>
                                                        <CardActions style={{
                                                            // left: '360px', position: 'relative'
                                                            height:"30px"
                                                        }}>

                                                            <FlatButton label="Out Of Stock"
                                                                        style={{color: "rgb(243, 86, 23)"}}
                                                                        onClick={this.handleOut.bind(this,reserv[0].id)}/>
                                                            <FlatButton label="Available"
                                                                        style={{color: "#0ac20a"}}
                                                                        onClick={this.handleAvailable.bind(this,reserv[0].id)}/>

                                                        </CardActions>
                                                    </Card>

                                                </Fragment>

                                            </Col>)
                                        }
                                    }
                                )}
                            </Col>
                        </Row>
                        <Row center="xs">
                            <Col sm={12} md={10} style={{border:'10px solid #c7b06f',marginTop:'30px'}} >
                                <h3
                                    style={{fontSize: '2em',
                                        fontWeight: '400',
                                        letterSpacing:'0.09em',
                                        textTransform: 'uppercase',
                                        color: '#ffffff',
                                        fontStyle: 'italic',
                                        fontFamily:'Cinzel Decorative,cursive'}}>Dessert</h3>
                                <hr className={" wow fadeInUp"}
                                    data-wow-offset="250" data-wow-duration="2s"/>
                                <Row between={"xs"}>
                                {this.props.menu.map(
                                    reserv => {
                                        if(reserv[0].category==='dessert'){
                                            return(<Col sm={12}  md={6}>
                                                <Fragment>
                                                    <Card style={{margin: '5px 0', border:"#c59d5f",textOverflow:'ellipsis',
                                                        overflow:'hidden',background:'rgba(255, 255, 255, 0.09)',borderRadius:'15px'}}  className={"cardBG3"}>


                                                        <CardHeader
                                                            style={{textAlign: 'left',fontFamily:'Source Sans Pro',
                                                            }}
                                                            actAsExpander={true}
                                                        >
                                                            <Row between="xs" >
                                                                <Col sm={8}>
                                                                    <div style={{fontFamily:"Source Sans Pro",color: "rgba(243,243,243)",
                                                                        fontWeight: '200',fontSize:"2.2em",letterSpacing:"0.08em",
                                                                        textTransform:'uppercase',textOverflow:'ellipsis',
                                                                        overflow:'hidden',maxWidth:"100%"}}>{reserv[0].name}
                                                                        <div style={{
                                                                            fontWeight: '400',fontSize:"0.3em",color: "#bbbfc5",textOverflow:'ellipsis',
                                                                            overflow:'hidden'}}>
                                                                            >{reserv[0].ingredients }</div>
                                                                    </div></Col>

                                                                <Col sm={4}>
                                                                    <div style={{
                                                                        marginTop:0,color: "rgba(243,243,243)",fontSize:'1.7em',
                                                                        fontWeight: '400',textAlign:'right'
                                                                    }}>
                                                                        <div style={{color:'#c59d5f'}}>{reserv[0].price} DZD</div>


                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>



                                                        <CardText expandable={true}>
                                                            <img src={reserv[1]?reserv[1].image_path:Logo} alt=""style={{width:'100%',height:'100%',
                                                                objectFit:'contain',borderRadius:'15px'}}/>
                                                            {reserv[0].description}
                                                        </CardText>
                                                        <CardActions style={{
                                                            // left: '360px', position: 'relative'
                                                            height:"30px"
                                                        }}>

                                                            <FlatButton label="Out Of Stock"
                                                            style={{color: "rgb(243, 86, 23)"}}
                                                                        onClick={this.handleOut.bind(this,reserv[0].id)}/>
                                                            <FlatButton label="Available"
                                                            style={{color: "#0ac20a"}}
                                                                        onClick={this.handleAvailable.bind(this,reserv[0].id)}/>

                                                        </CardActions>

                                                    </Card>

                                                </Fragment>

                                            </Col>)

                                        }
                                    }
                                ) }
                                </Row></Col></Row>
                        {/*<Row center="xs">*/}
                        {/*{this.props.menu.map(*/}
                        {/*reserv => {*/}





                        {/*// /!*Check for a trick to render coupons*!/*/}

                        {/*}*/}
                        {/*)}*/}
                        {/*</Row>*/}

                    </Paper>

                </Col></Row>


            </Paper>

        )

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getmenu: (i) => dispatch(getMenu(i)),
        available: (i) => dispatch(makeAvailable(i)),
        out: (i) => dispatch(makeOut(i)),
    }
};
const mapStateToProps = (state) => {
    return {
        menu: state.main.menu,

    }

};
export default connect(mapStateToProps, mapDispatchToProps)(MenuDisp);
{/*<Card style={{margin: '5px 0'}}>*/}
    {/*<CardHeader*/}
        {/*title="Dish"*/}
        {/*avatar="images/ok-128.jpg"*/}
        {/*subtitle={reserv.id}*/}
        {/*actAsExpander={true}*/}
        {/*showExpandableButton={true}*/}

    {/*/>*/}
    {/*<CardText expandable={true}>*/}
        {/*<ul>*/}
            {/*<li>Position: {reserv.id}</li>*/}
            {/*<li>{reserv.title} </li>*/}
        {/*</ul>*/}
    {/*</CardText>*/}
    {/*<CardActions>*/}
        {/*<FlatButton label="Out Of Stock"*/}
                    {/*style={{color: "red"}}/>*/}
        {/*<FlatButton label="Available"*/}
                    {/*style={{color: "green"}}/>*/}

    {/*</CardActions>*/}

{/*</Card>*/}