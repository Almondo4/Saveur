import React, {Component, Fragment} from 'react';
import {getCoupons,createEditCoupon,delCoup} from "../../store/Actions/ActionsAd";
import {connect} from "react-redux";
import {Col, Row} from "react-flexbox-grid";

import photo from "../../Components/assets/images/Stocks/Avatar.png";

//Mui
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from "moment/moment";


class CouponWs extends Component {

    state = {

        coupId: null,
        coupName: '',
        coupType: null,
        coupValue:null,
        coupStack: null,
        coupStart: null,
        coupEnd: null,
        coupImg: null
    };

    componentDidMount = () => {
        const info={
            api:localStorage.getItem('api_token')
        }
        this.props.bringCoupons(info)
    };
    handleCoupIDChange = (event) => {
        this.setState({coupId: event.target.value})
    };
    handleTypeChange=(event, index, value)=>{
        this.setState({coupType:value});
    };

    handleCoupVChange = (event) => {
        this.setState({coupValue: event.target.value})
    };
    handleStackChange=(event, index, value)=>{
        this.setState({coupStack:value});
    };
    // handleStartChange=(event,date)=>{
    //     const d= moment(date).format('YYYY-MM-DD ');
    //     this.setState({coupStart:d})
    //     console.log(this.state.coupStart)
    // };
    //
    // handleEndChange=(event,date)=>{
    //     const d= moment(date).format('YYYY-MM-DD ');
    //     this.setState({coupEnd:d})
    //     console.log(this.state.coupEnd)
    // };

    handleImgChange = (event) => {
        this.setState({evImg: event.target.value})
    };
    deleteCoup=(id)=>{
        this.props.deleteCoup(id);
    }

    handleSubmit = () => {
        const obj = {
            id:this.state.coupId,
            value:this.state.coupValue,
            type:this.state.coupType,
            stackable:this.state.coupStack,
            DateD:this.state.coupStart,
            DateF:this.state.coupEnd,
            api_token:localStorage.getItem('api_token')
        };
        this.props.CEC(obj);
    };


    render() {
        let x = new Date();
        return (
            <Paper className={"menuCover"}style={{ height:"100%",
                marginBottom:'650px',backgroundAttachment:'fixed'}}>
                {/*<h1 style={{textAlign: 'center', marginBottom: '50px'}}>COUPONS WS</h1>*/}
                <h1 style={{fontSize: '4em',
                    textAlign:'center',
                    fontWeight: '400',
                    letterSpacing:'0.09em',
                    margin:'20px',
                    color: '#cda561',
                    fontStyle: 'italic',
                    fontFamily:'Cinzel Decorative,cursive',}}>COUPONS WS</h1>


                <Row style={{marginBottom:'50px'}}>

                    <Col md={4} sm={12} mdOffset={1}>
                        <Paper zDepth={2} style={{padding: "20px",backgroundColor:'rgba(30, 31, 36, 0.37)'}}>
                            {this.props.coupons ?
                                <Fragment>
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
                                                        <CardActions>
                                                            <FlatButton label="Remove" style={{color: "#ffa45b"}}
                                                                        icon={<i className="material-icons">clear</i>}
                                                                        onClick={this.deleteCoup.bind(this,cpn[0].id)}
                                                            />

                                                        </CardActions>
                                                    </Card>
                                                </Col>
                                            )
                                        }
                                    )}
                                </Fragment>
                                :
                                <p>No Coupons.</p>}
                        </Paper>
                    </Col>
                    <Col md={6} className={"ModMenu"} style={{marginTop:'50px'}}>

                        <Paper zDepth={2} style={{padding: "20px",backgroundColor:"rgba(162, 157, 152, 0.13)",
                            border:'5px solid #cda561'}}>
                            <h1 style={{fontSize: '2em',
                                textAlign:'center',
                                fontWeight: '400',
                                letterSpacing:'0.09em',
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                fontStyle: 'italic',
                                fontFamily:"Source Sans Pro",}}>ADD OR MODIFY</h1>
                       <Row style={{marginTop:"100" }}>
                           <Col sm={12}>
                            <TextField
                                hintText="Only if you want to modify"
                                value={this.state.coupId}
                                floatingLabelText="coupon ID"
                                style={{bottom: 24,margin:0}}
                                onChange={this.handleCoupIDChange}
                                fullWidth={true}
                            /></Col>


                            {/*Type&value*/}
                            <Col sm={12}>
                                <Row>
                                <Col md={6}>
                            <SelectField
                                floatingLabelText="Coupon Type"
                                value={this.state.coupType}
                                onChange={this.handleTypeChange}
                                fullWidth={true}
                            >

                                <MenuItem value={"percentage"} primaryText={"Percentage "} />
                                <MenuItem value={"discount"} primaryText={"Discount "} />
                                <MenuItem value={"gift"} primaryText={"Gift"} />


                            </SelectField>
                                </Col>
                                <Col md={4}>
                            <TextField
                                hintText="How Much ?"
                                value={this.state.coupValue}
                                floatingLabelText="value"
                                onChange={this.handleCoupVChange}

                                fullWidth={true}
                                />
                                </Col>
                                    <Col md={2}>
                                        <SelectField
                                            floatingLabelText="Stackable?"
                                            value={this.state.coupStack}
                                            onChange={this.handleStackChange}
                                            fullWidth={true}
                                        >

                                            <MenuItem value={'true'} primaryText={"Yes"} />
                                            <MenuItem value={'false'} primaryText={"No"} />



                                        </SelectField>
                                    </Col>
                                    <RaisedButton label="Submit" onClick={this.handleSubmit}
                                                  fullWidth={true} primary={true}
                                                  style={{marginTop: '20px'}}/>

                                </Row>
                            </Col>
                            </Row>

                        </Paper>
                    </Col>

                </Row>
                </Paper>

        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        bringCoupons: (i) => dispatch(getCoupons(i)),
        CEC:(i)=>dispatch(createEditCoupon(i)),
        deleteCoup:(id)=>dispatch(delCoup(id)),
    }
};
const mapStateToProps = (state) => {
    return {
        coupons: state.Ad.coupons
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CouponWs);