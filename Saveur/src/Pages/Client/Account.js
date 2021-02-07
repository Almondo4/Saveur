import React,{Component,Fragment} from 'react';
import {connect} from "react-redux";
import {getAccount,changeAccount} from "../../store/Actions/ActionsCl";
import{Col,Row} from "react-flexbox-grid";
import axios from "axios";
//Mui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import photo from "../../Components/assets/images/Stocks/Avatar-Dummy.png";
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

class Account extends Component{
    state = {
        api_token:localStorage.getItem('api_token'),
        name: '',
        username:'',
        email: '',
        password:'',
        confirm:'',
        image:null,
    };



    handleUserChange = (event) => {
        this.setState(
            {name: event.target.value}
        );
    };
    handlePseudoChange = (event) => {
        this.setState(
            {username: event.target.value}
        );
    };
    handlePassChange = (event) => {
        this.setState(
            {password: event.target.value}
        );
    };

    handlemailChange = (event) => {
        this.setState(
            {email: event.target.value}
        );
    };
    handleImgChange = (event) => {

        this.setState({image:  event.target.files[0]})
        console.log(this.state.evImg)
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const info=new FormData();
        info.append('api_token',localStorage.getItem('api_token'));
        // if (this.state.name!='')
        info.append('name',this.state.name);
        // if (this.state.username!='')
        info.append('username',this.state.username);
        // if (this.state.email!='')
        info.append('email',this.state.email);
        // if (this.state.password!='')
        info.append('password',this.state.password);
        // if (this.state.image!=null)
            info.append('userPicture',this.state.image);


        // const info={
        //     api_token:localStorage.getItem('api_token'),
        //     name: this.state.name,
        //     username:this.state.username ,
        //     email: this.state.email,
        //     password:this.state.password
        // };
        this.props.handleS(info);
    };


    componentDidMount = () => {
        // console.log(this.state.api_token);
        // axios.get("http://lumen.test/api/v1/users/account?api_token="+this.state.api_token).then(res=>{
        //     console.log("here"+res)
        const info={
            api_token:localStorage.getItem('api_token'),
        }
        this.props.getAccount(info)
            // this.setState({
            //     name: res.data[0].name,
            //     username: res.data[0].username,
            //     email: res.data[0].email,
            //     img:res.data[1]? res.data[0].image_path:null
            // })
            // console.log(this.state)

        // })

    };

    render(){


        return(

            <Paper className={"menuCover"}style={{ height:"110%",
                marginBottom:'650px'}}>

                <h1  style={{fontSize: '2em',
                    textAlign:'center',
                    fontWeight: '400',
                    letterSpacing:'0.09em',
                    margin:'20px',
                    paddingTop:'110px',
                    color: '#c8d4ff',
                    fontStyle: 'italic',
                    fontFamily:'Cinzel Decorative,cursive',}}>Account</h1>


                <Row>
                <Col  sm={12} md={3}  mdOffset={1}>
                    <Card  className={"cardBG4"}
                          style={{margin: '5px 0',textAlign:'center',backgroundColor:"rgba(0, 0, 0, 0.44)",
                              borderRadius:'25px',border:'5px double #c59d5f'}}>

                        <CardMedia
                            overlay={<CardTitle title={this.props.accountuserame}  subtitle={this.state.id} />}
                            style={{height:"300px"}}
                        >
                            <img src={this.props.accountImg?this.props.accountImg:photo} style={{height:"300px",borderRadius:'25px'}}
                            />
                        </CardMedia>
                        <CardText >
                            <ul style={{listStyleType:'none'}}>


                                <li><span style={{textAlign: 'center',
                                    fontSize: '1.3em',
                                    fontWeight: '700',
                                    color: '#c59d5f',
                                    fontStyle: 'italic',
                                    fontFamily:'Cinzel Decorative,cursive'}}>Name: &nbsp;</span>
                                    <span style={{
                                        fontWeight: '500',fontSize:"1.1em",color: "rgb(236, 238, 247)",textOverflow:'ellipsis',
                                        overflow:'hidden',textAlign:'center',textTransform:"uppercase", fontWeight: '400',}}>{this.props.accountName}</span></li>

                                <li><span style={{textAlign: 'center',
                                    fontSize: '1.3em',
                                    fontWeight: '700',
                                    color: '#c59d5f',
                                    fontStyle: 'italic',
                                    fontFamily:'Cinzel Decorative,cursive'}}>Email:  &nbsp;</span>
                                    <span style={{
                                        fontWeight: '500',fontSize:"1.1em",color: "rgb(236, 238, 247)",textOverflow:'ellipsis',
                                        overflow:'hidden',textAlign:'center',textTransform:"uppercase", fontWeight: '400'}}>{this.props.accountEmail}</span></li>

                                <li><span style={{textAlign: 'center',
                                    fontSize: '1.3em',
                                    fontWeight: '700',
                                    color: '#c59d5f',
                                    fontStyle: 'italic',
                                    fontFamily:'Cinzel Decorative,cursive'}}>Role:  &nbsp;</span>
                                    <span style={{
                                        fontWeight: '500',fontSize:"1.1em",color: "rgb(236, 238, 247)",textOverflow:'ellipsis',
                                        overflow:'hidden',textAlign:'center',textTransform:"uppercase", fontWeight: '400'}}> {this.props.accountRole=="1"?"Admin":this.props.accountRole=="2"?"Client":"Supervisor"
                                    } </span></li>



                            </ul>
                        </CardText>


                    </Card>

                </Col>

                <Col  sm={12} md={6} mdOffset={1}  >
                    <Paper zDepth={2} style={{textAlign:'center',padding:"20px"}} className={"cardBG4"}
                     style={{margin: '5px 0',textAlign:'center',backgroundColor:"rgba(0, 0, 0, 0.44)",
                        borderRadius:'25px',border:'5px double #c59d5f'}} >
                        <h2
                            style={{fontSize: '1.5em',
                                textAlign:'center',
                                fontWeight: '400',
                                letterSpacing:'0.09em',
                                margin:'20px',
                                color: '#c8d4ff',
                                fontStyle: 'italic',
                                fontFamily:'Cinzel Decorative,cursive'}}>Modifications</h2>
                        <Col  sm={12} md={7} mdOffset={2}  >
                            <ValidatorForm
                                ref="form"
                                onSubmit={this.handleSubmit}
                                onError={errors => console.log(errors)}
                            >
                        <TextValidator
                            hintText=" New Nickname"
                            name="username"
                            value={this.state.username}
                            floatingLabelText="New Nickname"
                            onChange={this.handlePseudoChange}
                            fullWidth={true}
                            hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                            inputStyle={{ color: 'white', fontSize: '20px' }}
                            floatingLabelStyle={{color:'#c59d5f'}}
                        />
                        <TextValidator
                            hintText=" New Fullname"
                            name="Fullname"
                            value={this.state.name}
                            floatingLabelText="New username"
                            onChange={this.handleUserChange}
                            fullWidth={true}
                            hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                            inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                            floatingLabelStyle={{color:'#c59d5f'}}
                        />

                        <TextValidator
                           hintText="Example255@example.com"
                           name={"email"}
                           value={this.state.email}
                           onChange={this.handlemailChange}
                           validators={['isEmail']}
                           errorMessages={['Email is not valid']}
                           fullWidth={true}
                           floatingLabelText="New Email"
                           hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                           inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                           floatingLabelStyle={{color:'#c59d5f'}}
                                >
                        </TextValidator>
                        <TextValidator
                            hintText="New Password"
                            name="password"
                            value={this.state.password}
                            type="password"
                            onChange={this.handlePassChange}
                            fullWidth={true}
                            floatingLabelText="New Password"
                            hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                            inputStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                            floatingLabelStyle={{color:'#c59d5f'}}
                        />
                                <RaisedButton
                                    label="Choose an Image"
                                    labelPosition="before"
                                    containerElement="label"
                                    style={{marginTop: '50px'}}

                                >
                                    <input type="file" style={styles.exampleImageInput}
                                           onChange={this.handleImgChange}
                                           readOnly={true}
                                           hintTextStyle={{ color: 'aliceblue', fontSize: '20px' }}
                                           inputStyle={{ color: 'white', fontSize: '20px' }}
                                           floatingLabelStyle={{color:'#c59d5f'}}
                                    />
                                </RaisedButton>
                        <RaisedButton label="Submit" fullWidth={true}
                                      style={{margin:"30px 0"}}
                                      type={"submit"}
                                      primary={true}
                        />
                            </ValidatorForm>
                        </Col>
                    </Paper>

                </Col>
                </Row>
                </Paper>

        )
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAccount:(i)=>dispatch(getAccount(i)),
        handleS:(info)=>dispatch(changeAccount(info))

    }
};
const mapStateToProps = (state) => {
    return {
        accountName:state.Cl.accountName,
        accountuserame:state.Cl.accountusername,
        accountEmail:state.Cl.accountEmail,
        accountImg:state.Cl.accountImg,
        accountRole:state.Cl.accountRole
        }
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);