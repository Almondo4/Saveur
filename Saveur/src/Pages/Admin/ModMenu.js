import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getMenu} from '../../store/Actions/Actions';
import {createEditMenu} from '../../store/Actions/ActionsAd';
import {deleteDish} from '../../store/Actions/ActionsAd';
//Mui
import {Col, Row} from "react-flexbox-grid";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import "../../Components/NavBar/Nav.css"

import Logo from "../../Components/assets/images/Stocks/coming-soon.jpg";
import WOW from 'wowjs';

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';


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

class ModMenu extends Component{
    state={
        dishId:'',
        dishName:'',
        dishIng:'',
        dishDesc:'',
        dishCat:'',
        dishPrice:'',
        dishImg:null,

    }
    handleNameChange = (event) => {
        this.setState({dishName: event.target.value})

    };
    handleDescChange = (event) => {
        this.setState({dishDesc: event.target.value})

    };
    handleIngChange = (event) => {
        this.setState({dishIng: event.target.value})

    };
    handleImgChange = (event) => {
        this.setState({dishImg: event.target.files[0]})
        console.log(event.target.files[0])
    };
    handlePriceChange = (event) => {
        this.setState({dishPrice: event.target.value})

    };
    handleChange = (event, index, value) => {
        this.setState({dishId: value});

    }
    handleCatChange = (event, index, value) => {
        this.setState({dishCat: value});

    }
    handleSubmit=()=>{
        const info= {
            api_token:localStorage.getItem('api_token'),
            id:this.state.dishId,
            name:this.state.dishName,
            description:this.state.dishDesc,
            ingredients:this.state.dishIng,
            category:this.state.dishCat,
            price:this.state.dishPrice,
            availlable:'1',
            inMenu:'1',
            productPicture:this.state.dishImg,
        };
    this.props.chgMenu(info);
    }
    handleDelete = (id) => {
        const info = {
            api_token: localStorage.getItem('api_token'),
            idT: id

        }
    this.props.deleteD(info);
    }

    componentDidMount = () => {
        new WOW.WOW().init();
        const info= {
            api:localStorage.getItem('api_token'),
        };
        this.props.getmenu();
    };
    render() {

        return (

            <Paper className={"menuCover"} style={{ height:"110%",backgroundAttachment:'fixed',marginBottom:'550px'}}>
                <h1 style={{fontSize: '4em',
                    textAlign:'center',
                    fontWeight: '400',
                    letterSpacing:'0.09em',
                    margin:'20px',
                    color: '#cda561',
                    fontStyle: 'italic',
                    fontFamily:'Cinzel Decorative,cursive',}}>Menu</h1>
                < Row >
                  <Col sm={12} md={7} >
                    <Paper zDepth={2} style={{padding: "20px",backgroundColor: 'rgba(41, 41, 47, 0.68)'}} >
                        <Row style={{border:'10px solid #c7b06f'}}>
                            <Col sm={12}  >
                                <h3
                                    style={{fontSize: '2em',
                                        fontWeight: '400',
                                        textAlign:"center",
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
                                                        overflow:'hidden'}} className={"cardBG"}>


                                                        <CardHeader
                                                            style={{textAlign: 'left',fontFamily:'Source Sans Pro',
                                                            }}
                                                            actAsExpander={true}
                                                        >
                                                            <Row between="xs" >
                                                                <Col sm={8}>
                                                                    <div style={{fontFamily:"Source Sans Pro",
                                                                        fontWeight: '200',fontSize:"2.2em",letterSpacing:"0.08em",
                                                                        textTransform:'uppercase',textOverflow:'ellipsis',
                                                                        overflow:'hidden',maxWidth:"100%"}}> <span style={{color:"#c59d5f"}}>{reserv[0].id}.</span>{reserv[0].name}
                                                                        <div style={{
                                                                            fontWeight: '400',fontSize:"0.3em",color: "#6a6b72",textOverflow:'ellipsis',
                                                                            overflow:'hidden'}}>
                                                                            >{<reserv className="ingredients"></reserv>}</div>
                                                                    </div></Col>

                                                                <Col sm={4}>
                                                                    <div style={{
                                                                        marginTop:0,color: "#55565d",fontSize:'1.7em',
                                                                        fontWeight: '400',textAlign:'right'
                                                                    }}>
                                                                        <div>{reserv[0].price} DZD</div>


                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>



                                                        <CardText expandable={true}>
                                                            <img src={reserv[1]?reserv[1].image_path:Logo} alt=""style={{width:'100%',height:'100%',
                                                                objectFit:'contain'}}/>
                                                            {reserv[0].description}
                                                        </CardText>
                                                        <CardActions style={{
                                                            // left: '360px', position: 'relative'
                                                            height:"30px"
                                                        }}>

                                                            <FlatButton label="Remove"
                                                                        style={{color: "red"}}
                                                                        onClick={this.handleDelete.bind(this,reserv[0].id)}/>


                                                        </CardActions>
                                                    </Card>

                                                </Fragment>

                                            </Col>)
                                        }
                                    }
                                )}
                            </Col>
                            <Col sm={12} >
                                <h3
                                    style={{fontSize: '2em',
                                        fontWeight: '400',
                                        textAlign:"center",
                                        letterSpacing:'0.09em',
                                        textTransform: 'uppercase',
                                        color: '#cda561',
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
                                                        overflow:'hidden'}}>


                                                        <CardHeader
                                                            style={{textAlign: 'left',fontFamily:'Source Sans Pro',
                                                            }}
                                                            actAsExpander={true}
                                                        >
                                                            <Row between="xs" >
                                                                <Col sm={8}>
                                                                    <div style={{fontFamily:"Source Sans Pro",
                                                                        fontWeight: '200',fontSize:"2.2em",letterSpacing:"0.08em",
                                                                        textTransform:'uppercase',textOverflow:'ellipsis',
                                                                        overflow:'hidden',maxWidth:"100%"}}> <span style={{color:"#c59d5f"}}>{reserv[0].id}.</span>{reserv[0].name}
                                                                        <div style={{
                                                                            fontWeight: '400',fontSize:"0.3em",color: "#6a6b72",textOverflow:'ellipsis',
                                                                            overflow:'hidden'}}>
                                                                            >{<reserv className="ingredients"></reserv>}</div>
                                                                    </div></Col>

                                                                <Col sm={4}>
                                                                    <div style={{
                                                                        marginTop:0,color: "#55565d",fontSize:'1.7em',
                                                                        fontWeight: '400',textAlign:'right'
                                                                    }}>
                                                                        <div>{reserv[0].price} DZD</div>


                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>



                                                        <CardText expandable={true}>
                                                            <img src={reserv[1]?reserv[1].image_path:Logo} alt=""style={{width:'100%',height:'100%',
                                                                objectFit:'contain'}}/>
                                                            {reserv[0].description}
                                                        </CardText>
                                                        <CardActions style={{
                                                            // left: '360px', position: 'relative'
                                                            height:"30px"
                                                        }}>

                                                            <FlatButton label="Remove"
                                                                        style={{color: "red"}}
                                                                        onClick={this.handleDelete.bind(this,reserv[0].id)}/>


                                                        </CardActions>
                                                    </Card>

                                                </Fragment>

                                            </Col>)
                                        }
                                    }
                                )}
                            </Col>

                            <Col sm={12}  style={{marginTop:'30px'}} >
                                <h3
                                    style={{fontSize: '2em',
                                        fontWeight: '400',
                                        textAlign:"center",
                                        letterSpacing:'0.09em',
                                        textTransform: 'uppercase',
                                        color: '#ffffff',
                                        fontStyle: 'italic',
                                        fontFamily:'Cinzel Decorative,cursive'}}>Dessert</h3>
                                <hr className={" wow fadeInUp"}
                                    data-wow-offset="250" data-wow-duration="2s"/>
                                {this.props.menu.map(
                                    reserv => {
                                        // console.log(reserv[0].image_path?true:false);
                                        if(reserv[0].category==='dessert'){
                                            return(<Col sm={12} >
                                                <Fragment>
                                                    <Card style={{margin: '5px 0', border:"#c59d5f",textOverflow:'ellipsis',
                                                        overflow:'hidden'}}>


                                                        <CardHeader
                                                            style={{textAlign: 'left',fontFamily:'Source Sans Pro',
                                                            }}
                                                            actAsExpander={true}
                                                        >
                                                            <Row between="xs" >
                                                                <Col sm={8}>
                                                                    <div style={{fontFamily:"Source Sans Pro",
                                                                        fontWeight: '200',fontSize:"2.2em",letterSpacing:"0.08em",
                                                                        textTransform:'uppercase',textOverflow:'ellipsis',
                                                                        overflow:'hidden',maxWidth:"100%"}}> <span style={{color:"#c59d5f"}}>{reserv[0].id}.</span>{reserv[0].name}
                                                                        <div style={{
                                                                            fontWeight: '400',fontSize:"0.3em",color: "#6a6b72",textOverflow:'ellipsis',
                                                                            overflow:'hidden'}}>
                                                                            >{<reserv className="ingredients"></reserv>}</div>
                                                                    </div></Col>

                                                                <Col sm={4}>
                                                                    <div style={{
                                                                        marginTop:0,color: "#55565d",fontSize:'1.7em',
                                                                        fontWeight: '400',textAlign:'right'
                                                                    }}>
                                                                        <div>{reserv[0].price} DZD</div>


                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardHeader>



                                                        <CardText expandable={true}>
                                                            <img src={reserv[1]? reserv[1].image_path: Logo}
                                                                 defaultSource={Logo} alt=""style={{width:'100%',height:'100%',
                                                                objectFit:'contain'}}/>
                                                             <span style={{
                                                                 fontWeight: '400',fontSize:"0.67m",color: "#6a6b72",textOverflow:'ellipsis',
                                                                 overflow:'hidden'}}> {reserv[0].description}</span>
                                                        </CardText>
                                                        <CardActions style={{
                                                            // left: '360px', position: 'relative'
                                                            height:"30px"
                                                        }}>

                                                            <FlatButton label="Remove"
                                                                        style={{color: "red"}}
                                                                        onClick={this.handleDelete.bind(this,reserv[0].id)}
                                                            />


                                                        </CardActions>

                                                    </Card>

                                                </Fragment>

                                            </Col>)
                                        }
                                    }
                                )}
                            </Col>


                        </Row>
                    </Paper>

                </Col>
                    <Col sm={12}  md={4} className={"ModMenu"} style={{zIndex: "20"}}>
                        <Paper zDepth={2} style={{padding: "20px",border:'5px solid #cda561'}}>
                            <h1 style={{fontSize: '2em',
                                textAlign:'center',
                                fontWeight: '400',
                                letterSpacing:'0.09em',
                                textTransform: 'uppercase',
                                color: '#55565d',
                                fontStyle: 'italic',
                                fontFamily:"Source Sans Pro",}}>ADD OR MODIFY</h1>
                            <Row between={"xs"}>
                                <Col lg={5}>
                            <SelectField
                                floatingLabelText="Dish Id"
                                value={this.state.dishId}
                                onChange={this.handleChange}
                                autoOk={true}
                                fullWidth={true}
                            >
                                {this.props.menu.map(dish=>{
                                    return(
                                        <MenuItem value={dish[0].id} primaryText={dish[0].id} key={dish[0].id}/>

                                    )}
                                )}

                            </SelectField>
                                </Col>
                          <Col lg={5}>
                            <SelectField
                                floatingLabelText="Dish Category"
                                value={this.state.dishCat}
                                onChange={this.handleCatChange}
                                autoOk={true}
                                fullWidth={true}
                            >
                                <MenuItem value={"starter"} primaryText={"Starter"} />
                                <MenuItem value={"main"} primaryText={"Main"} />
                                <MenuItem value={"dessert"} primaryText={"Dessert"} />

                            </SelectField>
                          </Col>
                            </Row>
                            {/*<TextField*/}
                            {/*hintText="Only if you want to modify"*/}
                            {/*value={this.state.evenID}*/}
                            {/*floatingLabelText="Event ID"*/}
                            {/*onChange={this.handleVentIDChange}*/}
                            {/*fullWidth={true}/>*/}

                            <TextField
                                hintText="Dish Name"
                                value={this.state.dishName}
                                floatingLabelText="Dish Name"
                                onChange={this.handleNameChange}
                                fullWidth={true}/>

                            <TextField
                                hintText="Dish Description"
                                value={this.state.dishDesc}
                                floatingLabelText="Dish Description"
                                onChange={this.handleDescChange}
                                multiLine={true}
                                fullWidth={true}/>

                            <TextField
                                hintText="Dish Ingredients"
                                value={this.state.dishIng}
                                floatingLabelText="Dish Ingredients"
                                onChange={this.handleIngChange}
                                multiLine={true}
                                fullWidth={true}/>


                    <Row between={"xs"}>
                        <Col lg={7}>
                            <Row between={"xs"}>
                            <RaisedButton
                                label="Choose an Image"
                                labelPosition="before"
                                containerElement="label"
                                fullWidth={true}
                                style={{marginTop:"35px"}}

                            >

                                <input type="file" style={styles.exampleImageInput}
                                    onChange={this.handleImgChange}
                                />
                            </RaisedButton>
                                <Col lg={7}>
                            <TextField
                                style={{marginLeft:'10px'}}
                                value={this.state.dishImg}
                                fullWidth={true}
                                readOnly={true}
                            />
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <TextField
                                hintText="Dish Price"
                                value={this.state.dishPrice}
                                floatingLabelText="Price"
                                onChange={this.handlePriceChange}
                                type={"number"}
                                fullWidth={true}/>
                    </Col>
                    </Row>
                            <RaisedButton label="Submit"primary={true}
                                onClick={this.handleSubmit}
                                          fullWidth={true} style={{marginTop: '50px'}}/>

                        </Paper>


                    </Col>
                </Row>


            </Paper>

        )

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getmenu: () => dispatch(getMenu()),
        chgMenu: (i) =>dispatch(createEditMenu(i)),
        deleteD: (i) =>dispatch(deleteDish(i))
    }
};
const mapStateToProps = (state) => {
    return {
        menu: state.main.menu,

    }

};
export default connect(mapStateToProps, mapDispatchToProps)(ModMenu);