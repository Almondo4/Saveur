import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {getUsers,getCoupons,validateCPN} from "../../store/Actions/ActionsSv";
import {Col, Row} from "react-flexbox-grid";

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {Card, CardActions, CardHeader, CardText,CardMedia, CardTitle} from 'material-ui/Card';
import photo from "../../Components/assets/images/Stocks/Avatar.png";

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

class CouponValid extends Component {
    state={
        searching:'',
    };
    handleSearch=(e)=>{
        this.setState({searching:e.target.value})
    };
    searchUser = () => {
        const info={
            api:localStorage.getItem('api_token'),
            e:this.state.searching
        };
        this.props.getUsers(info);
    };
    getCoupons=(id) =>{
        const info={
            api:localStorage.getItem('api_token'),
            e:id
        };
        this.props.getCoupon(info);
    };
    useCoupon=(id) =>{
        const info={
            api:localStorage.getItem('api_token'),
            id:id
        };
        this.props.validCpn(info);
    };
    render() {
        return (
            <Paper className={"menuCover"}style={{ height:"100%",marginTop:0,
                backgroundAttachment:'fixed'}}>
                <h1 style={{fontSize: '4em',
                    textAlign:'center',
                    fontWeight: '400',
                    letterSpacing:'0.09em',
                    margin:'20px',
                    color: '#cda561',
                    fontStyle: 'italic',
                    fontFamily:'Cinzel Decorative,cursive',}}>Coupon Validation</h1>
                <Paper zDepth={2} style={{padding: "20px", backgroundColor: 'rgba(162, 157, 152, 0.13)'
                    ,marginBottom:'550px'}}>


                <Row>

                    <Col sm={8} smOffset={2}>
                        <Paper zDepth={2} style={{padding: "20px"}} className={"cardBG4"}>
                            <Row center="xs">
                                <Col sm={8}>
                                    <TextField
                                        hintText="Search By Username......"
                                        onChange={this.handleSearch}
                                        fullWidth={true}
                                    />
                                </Col>
                                <Col sm={2}>
                                    <RaisedButton
                                        label="Search"
                                        // labelPosition="before"
                                        primary={true}
                                        onClick={this.searchUser}
                                        icon={<i className="material-icons">search</i>}

                                    />
                                </Col>
                            </Row>
                        </Paper>
                    </Col>

                </Row>
                <Row>
                    <Col sm={8}>
                        <h3 style={{fontSize: '2em',
                            textAlign:'center',
                            fontWeight: '400',
                            letterSpacing:'0.09em',
                            textTransform: 'uppercase',
                            color: '#eef8ff',
                            fontStyle: 'italic',
                            fontFamily:"Source Sans Pro",}}>Search result</h3>
                        {this.props.users ?
                            <Fragment>
                                {
                                    this.props.users.map(user => {
                                        const us=user[0].username;
                                        const nom='Full Name: '+user[0].name;
                                        const email='Email: '+user[0].email;
                                        return (
                                            <Col sm={12} md={8} >

                                                <Fragment>

                                                    <Card style={{margin: '5px 0',border:'solid 5px rgb(197, 157, 95)'}} className={"cardBG"}>
                                                        <CardHeader
                                                            title={us}
                                                            avatar={user[1]?user[1].image_path:photo}
                                                            subtitle={user[0].id}
                                                            actAsExpander={true}
                                                            showExpandableButton={false}

                                                        />
                                                        <CardText expandable={true}>
                                                            <ul style={{listStyleType:'none'}}>


                                                                <li><span style={{textAlign: 'center',
                                                                    fontSize: '1.3em',
                                                                    fontWeight: '700',
                                                                    color: '#c59d5f',
                                                                    fontStyle: 'italic',
                                                                    fontFamily:'Cinzel Decorative,cursive'}}>Name: &nbsp;</span>
                                                                    <span style={{
                                                                        fontWeight: '500',fontSize:"1.1em",color: "#6a6b72",textOverflow:'ellipsis',
                                                                        overflow:'hidden',textAlign:'center'}}>{user[0].name}</span></li>

                                                                <li><span style={{textAlign: 'center',
                                                                    fontSize: '1.3em',
                                                                    fontWeight: '700',
                                                                    color: '#c59d5f',
                                                                    fontStyle: 'italic',
                                                                    fontFamily:'Cinzel Decorative,cursive'}}>Email:  &nbsp;</span>
                                                                    <span style={{
                                                                        fontWeight: '500',fontSize:"1.1em",color: "#6a6b72",textOverflow:'ellipsis',
                                                                        overflow:'hidden',textAlign:'center'}}>{user[0].email}</span></li>

                                                                <li><span style={{textAlign: 'center',
                                                                    fontSize: '1.3em',
                                                                    fontWeight: '700',
                                                                    color: '#c59d5f',
                                                                    fontStyle: 'italic',
                                                                    fontFamily:'Cinzel Decorative,cursive'}}>Role:  &nbsp;</span>
                                                                    <span style={{
                                                                        fontWeight: '500',fontSize:"1.1em",color: "#6a6b72",textOverflow:'ellipsis',
                                                                        overflow:'hidden',textAlign:'center'}}> {user[0].role_id=="1"?"Admin":user[0].role_id=="2"?"Client":"Supervisor"
                                                                    } </span></li>



                                                            </ul>
                                                        </CardText>
                                                        <CardActions>
                                                            <FlatButton label="check Coupons"
                                                                        icon={<i className="material-icons">youtube_searched_for</i>}
                                                                        style={{
                                                                            color: "blue"
                                                                        }}
                                                                        onClick={this.getCoupons.bind(this,user[0].id)}/>


                                                        </CardActions>

                                                    </Card>


                                                </Fragment>


                                            </Col>

                                        )
                                    })
                                }</Fragment> :
                            <p>
                                Couldn't Fetch Users
                            </p>

                        }
                    </Col>
                    <Col sm={4}>
                        <Col sm={10}  >
                            <h3 style={{fontSize: '2em',
                                textAlign:'center',
                                fontWeight: '400',
                                letterSpacing:'0.09em',
                                textTransform: 'uppercase',
                                color: '#eef8ff',
                                fontStyle: 'italic',
                                fontFamily:"Source Sans Pro",}}>Coupons</h3>
                            {this.props.coupons.map(cpn =>
                            <Row  >
<Col sm={12}>

                                <Card style={{margin: '5px 0'}} className={"cardBG2"} >
                                    {/*<CardHeader*/}
                                        {/*title="Coupon"*/}
                                        {/*avatar=*/}
                                        {/*subtitle={cpn.id}*/}
                                        {/**/}
                                        {/*showExpandableButton={true}*/}

                                    {/*/>*/}
                                    <CardMedia
                                        style={{maxHeight:'70%'}}
                                        actAsExpander={true}
                                    >
                                        <img src={cpn[1]?cpn[1].image_path:photo} />
                                    </CardMedia>
                                    <CardText expandable={true}  >
                                        <Row between={'xs'}>
                                            <Col sm={7}>
                                                <Row>
                                                    <Col sm={12} >
                                                 <span style={{textAlign: 'center',
                                            fontSize: '1.3em',
                                            fontWeight: '700',
                                            color: '#c59d5f',
                                            fontStyle: 'italic',
                                            fontFamily:'Cinzel Decorative,cursive'}}>Value:  &nbsp;</span>
                                            <span style={{
                                                fontWeight: '500',fontSize:"1.1em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                overflow:'hidden',textAlign:'center'}}> {cpn[0].value}</span>
                                              </Col>
                                                <Col sm={12} >
                                                    <span style={{textAlign: 'center',
                                                         fontSize: '1.3em',
                                                         fontWeight: '700',
                                                         color: '#c59d5f',
                                                         fontStyle: 'italic',
                                                         fontFamily:'Cinzel Decorative,cursive'}}>Stackable:  &nbsp;</span>
                                                    <span  style={{
                                                        fontWeight: '500',fontSize:"1.1em",color: "rgb(188, 189, 195)",textOverflow:'ellipsis',
                                                        overflow:'hidden',textAlign:'center'}}> {cpn[0].stackable=="1"?
                                                        <i class="material-icons" style={{top:'4px',position:"relative"}}>done</i>:
                                                        <i className="material-icons" style={{top:'4px',position:"relative"}}>remove_circle</i>
                                                     }</span>

                                                 </Col>

                                        </Row>
                                            </Col>
                                            <Col sm={4} mdOffset={1}>
                                        <FlatButton
                                            label={"Use coupon "}
                                            style={{color: "#0ad80a"}}
                                            icon={<i class="material-icons">
                                                done_outline
                                            </i>}
                                            onClick={this.useCoupon.bind(this,cpn[0].id)}/></Col>
                                        </Row>
                                    </CardText>






                                </Card>

</Col>
                            </Row>)

                            }
                        </Col>

                    </Col>
                </Row>
                </Paper>
            </Paper>
        )

    };

}
const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: (i) => dispatch(getUsers(i)),
        getCoupon: (i) =>dispatch(getCoupons(i)),
        validCpn:(i) =>dispatch(validateCPN(i))
    }
};
const mapStateToProps = (state) => {
    return {
        users: state.Sv.users,
        coupons:state.Sv.fetchedCoupons
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CouponValid);