import React, {Component, Fragment,PureComponent} from 'react';
import {getTables, deleteTable,changeTable} from "../../store/Actions/ActionsAd";
import {connect} from "react-redux";
import {Col, Row} from "react-flexbox-grid";
//Mui
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {SelectValidator, ValidatorForm} from 'react-material-ui-form-validator';


class Tables extends PureComponent {

    state = {
        nbPlace: null,
        position: null

    };
    componentDidMount = () => {
        this.props.bringTables(localStorage.getItem("api_token"));
    };
    handleDelete = (id) => {
        const info = {
            api_token: localStorage.getItem('api_token'),
            idT: id

        }
        this.props.deleteTable(info)
    };


    handlePlaceChange = (event, index, value) => this.setState({nbPlace: value});

    handlePositionChange = (event, index, value) => this.setState({position: value});
    handleSubmit = () => {
        const info={
            api_token:localStorage.getItem('api_token'),
            position:this.state.position,
            nbPlaces:this.state.nbPlace
        }
        this.props.changeTable(info)    };

    render() {
        const myTables= [...this.props.tables];
        return (
            <Paper className={"menuCover"}style={{ height:"110%",marginTop:0}}>
                <h1 style={{fontSize: '4em',
                    textAlign:'center',
                    fontWeight: '400',
                    letterSpacing:'0.09em',
                    margin:'20px',
                    color: '#cda561',
                    fontStyle: 'italic',
                    fontFamily:'Cinzel Decorative,cursive',}}>Tables</h1>
                {
                    this.props.tables ?
                        <Fragment>


                            <Row center={'xs'} style={{marginBottom: '20px'}}>
                                <Col md={8}>
                                    <Paper zDepth={2} style={{padding: "20px",
                                        backgroundColor:"rgba(162, 157, 152, 0.13)",}}>
                                        <h1 style={{fontSize: '2em',
                                            textAlign:'center',
                                            fontWeight: '400',
                                            letterSpacing:'0.09em',
                                            textTransform: 'uppercase',
                                            color: '#ffffff',
                                            fontStyle: 'italic',
                                            fontFamily:"Source Sans Pro",}}>ADD OR MODIFY</h1>


                                                <ValidatorForm
                                                    ref="form"
                                                    onSubmit={this.handleSubmit}
                                                    onError={errors => console.log(errors)}
                                                >
                                                    <Row center={'xs'} style={{marginBottom: '20px'}}>
                                             <Col md={7}>
                                                    <SelectValidator
                                                        floatingLabelText="Position"
                                                        name={"postion"}
                                                        value={this.state.position}
                                                        onChange={this.handlePositionChange}
                                                        fullWidth={true}
                                                        validators={['required']}
                                                        errorMessages={['this field is required']}
                                                        fullWidth={true}
                                                        autoOk={true}
                                                        selectedMenuItemStyle={{color: '#c59d5f', fontSize: '20px' }}
                                                        labelStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                                        floatingLabelStyle={{color:'#c59d5f'}}
                                                    >
                                                        <MenuItem value={'1'} primaryText="1"/>
                                                        <MenuItem value={'2'} primaryText="2"/>
                                                        <MenuItem value={'3'} primaryText="3"/>
                                                        <MenuItem value={'4'} primaryText="4"/>
                                                        <MenuItem value={'5'} primaryText="5"/>
                                                        <MenuItem value={'6'} primaryText="6"/>
                                                        <MenuItem value={'7'} primaryText="7"/>
                                                        <MenuItem value={'8'} primaryText="8"/>
                                                        <MenuItem value={'9'} primaryText="9"/>
                                                        <MenuItem value={'10'} primaryText="10"/>
                                                        <MenuItem value={'11'} primaryText="11"/>
                                                        <MenuItem value={'12'} primaryText="12"/>
                                                        <MenuItem value={'13'} primaryText="13"/>
                                                        <MenuItem value={'14'} primaryText="14"/>
                                                        <MenuItem value={'15'} primaryText="15"/>
                                                        <MenuItem value={'16'} primaryText="16"/>
                                                        <MenuItem value={'17'} primaryText="17"/>
                                                        <MenuItem value={'18'} primaryText="18"/>
                                                        <MenuItem value={'19'} primaryText="19"/>
                                                        <MenuItem value={'20'} primaryText="20"/>


                                                    </SelectValidator>
                                             </Col>
                                              <Col md={7}>

                                                    <SelectValidator
                                                        floatingLabelText="NUMBER OF PLACES"
                                                        name="nbPlaces"
                                                        validators={['required']}
                                                        errorMessages={['this field is required']}
                                                        value={this.state.nbPlace}
                                                        onChange={this.handlePlaceChange}
                                                        fullWidth={true}
                                                        autoOk={true}
                                                        MenuItemStyle={{color: '#c59d5f', fontSize: '20px' }}
                                                        labelStyle={{ color: '#d0d0d0', fontSize: '20px' }}
                                                        floatingLabelStyle={{color:'#c59d5f'}}
                                                    >
                                                        <MenuItem value={'2'} primaryText="Two"/>
                                                        <MenuItem value={'4'} primaryText="Four"/>
                                                        <MenuItem value={'8'} primaryText="Eight"/>


                                                    </SelectValidator>
                                              </Col>
                                                    <RaisedButton label="Submit New Info" primary={true}
                                                                  type={"submit"}
                                                                  fullWidth={true} style={{marginTop: '50px'}}/>
                                                    </Row>
                                                </ValidatorForm>


                                    </Paper>
                                </Col>

                            </Row>

                            <Paper zDepth={2} style={{padding: "20px", backgroundColor:'rgba(162, 157, 152, 0.13)'}}>
                                <Row>
                                    {

                                        this.props.tables.map(
                                        tb => {
                                            return (
                                                <Col sm={3} key={tb.position}>
                                                    <Card style={{margin: '5px 0',border:'solid 5px rgb(197, 157, 95)'}} className={"cardBG"}>

                                                        <div style={{paddingLeft:"30px", margin:"0"}}>
                                                            <p style={{margin:"0"}}><span style={{textAlign: 'center',
                                                                fontSize: '2em',
                                                                fontWeight: '700',
                                                                color: '#c59d5f',
                                                                fontStyle: 'italic',
                                                                margin:"0",
                                                                fontFamily:'Cinzel Decorative,cursive'}}>{tb.position}</span> </p>
                                                        </div>
                                                        <CardText  style={{padding:"5px"}}>
                                                            <ul style={{listStyleType: 'none'}}>
                                                                <li style={{marginTop:"10px"}}>
                                                                    <span style={{textAlign: 'center',
                                                                    fontSize: '1.3em',
                                                                    fontWeight: '700',
                                                                    color: '#c59d5f',
                                                                    fontStyle: 'italic',
                                                                    fontFamily:'Cinzel Decorative,cursive'}}>Number of chairs:&nbsp; </span>
                                                                    <span style={{
                                                                        fontWeight: '500',fontSize:"1.3em",color: "#6a6b72",textOverflow:'ellipsis',
                                                                        overflow:'hidden',textAlign:'center'}}>{tb.nbPlaces}</span> </li>

                                                            </ul>
                                                        </CardText>
                                                        <CardActions>
                                                            <FlatButton label="Delete"
                                                                        style={{
                                                                            color: "red"
                                                                        }}
                                                                        icon={<i
                                                                            className="material-icons md-light">clear</i>}
                                                                        onClick={this.handleDelete.bind(this, tb.id)}/>


                                                        </CardActions>

                                                    </Card>
                                                </Col>
                                            )
                                        }
                                    )}</Row>
                            </Paper>
                        </Fragment>
                        :
                        <p>No Tables.</p>
                }
            </Paper>
        )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        bringTables: (api) => dispatch(getTables(api)),
        deleteTable: (id) => dispatch(deleteTable(id)),
        changeTable:(info)=>dispatch(changeTable(info))
    }
};
const mapStateToProps = (state) => {
    return {
        tables: state.Ad.tables

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Tables);