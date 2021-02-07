import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Logo from "../../Components/assets/images/Stocks/coming-soon.jpg";
//Mui
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {Col, Row} from "react-flexbox-grid";
import {getMenu,} from '../../store/Actions/Actions';
import {addCart} from '../../store/Actions/ActionsCl';
import "../../App.css";
import WOW from 'wowjs';


class Menu extends Component {

    componentDidMount = () => {
        new WOW.WOW().init();
        const info= {
            api:localStorage.getItem('api_token'),
        };
        this.props.Menu(info)
    };
    handleAdd = (id) => {
        const info = {
            api_token: localStorage.getItem('api_token'),
            product_id: id

        }
        this.props.addCart(info);
    };
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
                                                                        <div style={{color:'#c59d5f'}}>{reserv[0].price} DZD</div>
                                                                        <div> <FlatButton label="Add To Cart"
                                                                                          icon={<i className="material-icons">shopping_cart</i>}
                                                                                          onClick={this.handleAdd.bind(this,reserv[0].id)}
                                                                                          disabled={!reserv[0].available?true:false}
                                                                                          style={{color: "#66943e"}}/></div>


                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>




                                                        <CardText expandable={true}
                                                                  style={{color:'rgb(239, 238, 255)',fontWeight:'400',fontSize:'1.8em',fontStyle: 'italic',
                                                                      fontFamily:'Dancing Script,cursive' }}>
                                                            <img src={reserv[1]?reserv[1].image_path:Logo} alt=""style={{width:'100%',height:'100%',
                                                                objectFit:'contain',borderRadius:'15px'}}/>
                                                            {reserv[0].description}
                                                        </CardText>

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
                                                                        <div> <FlatButton label="Add To Cart"
                                                                                          icon={<i className="material-icons">shopping_cart</i>}
                                                                                          onClick={this.handleAdd.bind(this,reserv[0].id)}
                                                                                          disabled={!reserv[0].available?true:false}
                                                                                          style={{color: "#66943e"}}/></div>


                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>



                                                        <CardText expandable={true}
                                                                  style={{color:'rgb(239, 238, 255)',fontWeight:'400',fontSize:'1.8em',fontStyle: 'italic',
                                                                      fontFamily:'Dancing Script,cursive' }}>
                                                            <img src={reserv[1]?reserv[1].image_path:Logo} alt=""style={{width:'100%',height:'100%',
                                                                objectFit:'contain',borderRadius:'15px'}}/>
                                                            {reserv[0].description}
                                                        </CardText>

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
                                                                            <div> <FlatButton label="Add To Carte"
                                                                                              onClick={this.handleAdd.bind(this,reserv[0].id)}icon={<i className="material-icons">shopping_cart</i>}
                                                                                              disabled={!reserv[0].available?true:false}
                                                                                              style={{color: "#66943e"}}/></div>


                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </CardHeader>



                                                            <CardText expandable={true}
                                                                      style={{color:'rgb(239, 238, 255)',fontWeight:'400',fontSize:'1.8em',fontStyle: 'italic',
                                                                          fontFamily:'Dancing Script,cursive' }}>
                                                                <img src={reserv[1]?reserv[1].image_path:Logo} alt=""style={{width:'100%',height:'100%',
                                                                    objectFit:'contain',borderRadius:'15px'}}/>
                                                                {reserv[0].description}
                                                            </CardText>


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
    }
};
const mapStateToProps = state => {
    return {
        menu: state.main.menu,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        Menu: (i) => dispatch(getMenu(i)),
        addCart: (i) => dispatch(addCart(i)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

{/*<CardHeader*/}
    {/*style={{textAlign: 'left',fontFamily:'Source Sans Pro',*/}
    {/*}}*/}
    {/*actAsExpander={true}*/}
{/*>*/}
    {/*<Row between="xs" >*/}
        {/*<Col sm={8}>*/}
            {/*<div style={{fontFamily:"Source Sans Pro",*/}
                {/*fontWeight: '200',fontSize:"2.2em",letterSpacing:"0.08em",*/}
                {/*textTransform:'uppercase',}}>{reserv.name}*/}
                {/*<div style={{*/}
                    {/*fontWeight: '400',fontSize:"0.3em",color: "#6a6b72",textOverflow:'ellipsis',*/}
                    {/*overflow:'hidden'}}>*/}
                    {/*>{reserv.description }</div>*/}
            {/*</div></Col>*/}

        {/*<Col sm={4}>*/}
            {/*<div style={{*/}
                {/*marginTop:0,color: "#55565d",fontSize:'1.7em',*/}
                {/*fontWeight: '400',textAlign:'right'*/}
            {/*}}>*/}
                {/*<div>{reserv.price} DZD</div>*/}
                {/*<div> <FlatButton label="Add To Carte"*/}
                                  {/*icon={<i className="material-icons">shopping_cart</i>}*/}
                                  {/*disabled={!reserv.available?true:false}*/}
                                  {/*style={{color: "#c59d5f"}}/></div>*/}

            {/*</div>*/}
        {/*</Col>*/}
    {/*</Row>*/}
{/*</CardHeader>*/}