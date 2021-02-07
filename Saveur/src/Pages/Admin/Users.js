import React,{Component,Fragment} from 'react';
import {getUsers,deleteUser,getAllUsers} from "../../store/Actions/ActionsAd";
import {connect} from "react-redux";

import {Col, Row} from "react-flexbox-grid";

//Mui
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import {Card, CardActions, CardHeader, CardText,CardMedia, CardTitle,} from 'material-ui/Card';

import photo from "../../Components/assets/images/Stocks/Avatar.png";

class Users extends Component{

    state={
        searching:'',
    }
    componentDidMount = () => {

    };
    handleSearch=(e)=>{
        this.setState({searching:e.target.value})
    };
    getUsers=()=>{
       const info= {
           api:localStorage.getItem('api_token'),
           e:this.state.searching
           };

        this.props.bringUsers(info);
    };
    getAllUsers=()=>{
        const info= {
            api:localStorage.getItem('api_token'),
        };

        this.props.bringAllUsers(info);
    };
    handleDelete=(id)=>{
        const info={
            idU:id,
            api_token:localStorage.getItem('api_token')
        }
        this.props.delete(info)
    }

    render(){
        return(
            <Paper className={"menuCover"}style={{ height:"100%",
                marginBottom:'650px',backgroundAttachment:'fixed'}}>

                <h1 style={{fontSize: '4em',
                    textAlign:'center',
                    fontWeight: '400',
                    letterSpacing:'0.09em',
                    margin:'20px',
                    color: '#cda561',
                    fontStyle: 'italic',
                    fontFamily:'Cinzel Decorative,cursive',}}>Users</h1>
                    {/*<h1 style={{textAlign:"center"}}>Users</h1>*/}
                <Paper zDepth={2} style={{padding: "20px", backgroundColor:'rgba(162, 157, 152, 0.13)'}}>
                    <Row style={{minHeight:'100%'}}>

                        <Col md={8} smOffset={2}>
                            <Paper zDepth={2} style={{padding: "20px"}}>
                                <Row >
                                    <Col  sm={6}md={8}>
                                        <TextField
                                            style={{marginTop: "5px"}}
                                            hintText="Search By Username......"
                                            onChange={this.handleSearch}
                                            fullWidth={true}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <RaisedButton
                                            style={{marginTop: "5px"}}
                                            label="Search"
                                            // labelPosition="before"
                                            fullWidth={true}
                                            primary={true}
                                            onClick={this.getUsers}
                                            icon={<i className="material-icons md-light">search</i>}

                                        />
                                    </Col>
                                    <Col md={2}>
                                        <RaisedButton

                                            label="All Users"
                                            // labelPosition="before"
                                            fullWidth={true}
                                            primary={true}
                                            onClick={this.getAllUsers}


                                        />
                                    </Col>
                                </Row>
                            </Paper>
                        </Col>

                    </Row>

                    {
                    this.props.users?
                        <Fragment>
                            <Row style={{marginTop:'50px',minHeight:'100%'}}>
                            {this.props.users.map(
                                user=>{
                                    return(
                                        <Col xs ={12} sm={6} md={3} lg={2} key={user[0].id} style={{maxHeight:"50%"}}>

                                            <Fragment>


                                                <Card style={{margin: '5px 0',border:'solid 5px rgb(197, 157, 95)',paddingTop:0}} className={"cardBG"}>
                                                    {/*<CardHeader*/}
                                                        {/**/}
                                                        {/*avatar={user[1]?user[1].image_path:photo}*/}
                                                       {/**/}
                                                        {/*actAsExpander={true}*/}
                                                        {/*showExpandableButton={true}*/}
                                                    {/*/>*/}
                                                    <CardMedia
                                                        actAsExpander={true}
                                                        overlay={<CardTitle title={user[0].username}  subtitle={user[0].id} />}
                                                        style={{height:"300px"}}
                                                    >
                                                        <img src={user[1]?user[1].image_path:photo} style={{height:"300px"}}
                                                        />
                                                    </CardMedia>
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
                                                        <FlatButton label="Delete"
                                                                    style={{
                                                                        color: "red"
                                                                    }}
                                                                    icon={<i
                                                                        className="material-icons md-light">clear</i>}
                                                                    onClick={this.handleDelete.bind(this,user[0].id)}/>


                                                    </CardActions>

                                                </Card>


                                            </Fragment>


                                        </Col>

                                    )
                                }
                            )}
                            </Row>
                        </Fragment>
                        :
                        <p>No Users Were Found</p>
                }
                </Paper>
            </Paper>
        )
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        bringUsers: (t) => dispatch(getUsers(t)),
        bringAllUsers: (t) => dispatch(getAllUsers(t)),
        delete:(info)=>dispatch(deleteUser(info))
    }
};
const mapStateToProps = (state) => {
    return {
        users:state.Ad.users}
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);