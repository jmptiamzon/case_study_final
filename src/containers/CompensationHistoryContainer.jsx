import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CompensationMonth  from '../components/compensation-history/CompensationMonth';
import CompensationRange  from '../components/compensation-history/CompensationRange';
import axios from 'axios';

const END_POINT_URL = 'http://localhost:8081/';

class CompensationHistoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            totalMonthAmount: 0,
            totalRangeAmount: 0,
            compensationResultLength: 0,
            compensationRangeResultLength: 0,
            errorMessage: '',
            componentToShow: <CompensationRange />,
            compensationResult: [],
            compensationRangeResult: [],
            compensationMonthData: {
                date: '',
                id: ''
            },
            compensationRangeData: {
                startDate: '',
                endDate: '',
                id: ''
            }
        }
    }

    componentDidMount() {
        if (!sessionStorage.getItem('user_cred')) {
            this.props.history.push('/');
        }
    }

    handleChange = (event, newValue) => {
        if (newValue === 0) {
            this.setState( 
                { 
                    componentToShow: true, 
                    errorMessage: '',            
                    compensationResult: [],
                    compensationRangeResult: []

                } 
            )
        }

        if (newValue === 1) {
            this.setState( 
                { 
                    componentToShow: false, 
                    errorMessage: '',
                    compensationResult: [],
                    compensationRangeResult: []
                } 
            );
        }

        this.setState( { value: newValue } );
    }

    onChangeListener = e => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            compensationMonthData: {
                ...prevState.compensationMonthData,
                [name]: value
            },
            errorMessage: ''
        }));

        const errorMessage = this.validationMonth(name, value);

        if (errorMessage.trim().length !== 0) {
            this.setState({ errorMessage: errorMessage });
        }
    }

    onChangeRangeListener = e => {
        const { name, value } = e.target;
  
        this.setState((prevState) => ({
            compensationRangeData: {
                ...prevState.compensationRangeData,
                [name]: value
            },
            errorMessage: ''
        }));

        const errorMessage = this.validationRange(name, value);

        if (errorMessage.trim().length !== 0) {
            this.setState({ errorMessage: errorMessage });
        }
    }

    validationMonth = (name, value) => {
        let errorMessage = '';

        if (name === 'date') {
            if (value.trim().split('-').length < 2) {
                errorMessage = 'Please complete the date field.';
            }

            if (value.trim().length === 0) {
                errorMessage = 'Month field is required.'
            }
        }

        if (name === 'id') {
            if (value.trim().length === 0) {
                errorMessage = 'Employee field is required.';
            }
        }

        return errorMessage
    }

    validationRange = (name, value) => {
        let errorMessage = '';

        if (name === 'startDate' || name === 'endDate') {
            if (value.trim().split('-').length < 2) {
                errorMessage = 'Please complete the date field.';
            }

            if (value.trim().length === 0) {
                errorMessage = 'Month field is required.'
            }
        }

        if (name === 'id') {
            if (value.trim().length === 0) {
                errorMessage = 'Employee field is required.';
            }
        }

        return errorMessage
        
    }

    onSubmitMonthListener = () => {
        const errorCheck = this.state.errorMessage;
        const formToSubmit = this.state.compensationMonthData;
        let totalValue = 0;

        if (errorCheck === '') {
            if (formToSubmit.date.trim().length !== 0 && formToSubmit.id.trim().length !== 0) {
                axios.post(END_POINT_URL + 'getCompensationMonth', formToSubmit)
                    .then((response) => {
                        if (response.data.status) {
                            this.setState( { errorMessage: response.data.errorMessage } );

                        } 
                        
                        else {
                            response.data.compensationList.map((result) => totalValue = result.amount + totalValue);
                            this.setState( 
                                { 
                                    compensationResult: response.data.compensationList, 
                                    totalMonthAmount: totalValue,
                                    compensationResultLength: response.data.compensationList.length,
                                    errorMessage: ''
                                } 
                            );
                        }

                    })
        
                    .catch((error) => {
                        //console.log(error);
                        // handle error
                    });

            } else {
                this.setState( { errorMessage: 'Please fill-up the fields.' } );
            }

        } 
    }

    onSubmitRangeListener = () => {
        const errorCheck = this.state.errorMessage;
        const formToSubmit = this.state.compensationRangeData;
        let totalValue = 0;

        if (errorCheck === '') {
            if (formToSubmit.startDate.trim().length !== 0 && formToSubmit.endDate.trim().length !== 0
                && formToSubmit.id.trim().length !== 0) {
                    axios.post(END_POINT_URL + 'getCompensationRange', formToSubmit)
                    .then((response) => {
                        /*Object.keys(response.data.compensationRange).map((key, i) => 
                            response.data.compensationRange[key].map((result) => console.log(result.id))
                        
                        );*/
                        

                        console.log(response);
                        //console.log(response.data.compensationRange['2020']);
                        if (response.data.status) {
                            this.setState( { errorMessage: response.data.errorMessage } );

                        }

                        else {/*
                            response.data.compensationRange.map((result) => 
                                totalValue = totalValue + result.amount
                            );*/
        
                            this.setState( 
                                { 
                                    compensationRangeResult: response.data,  
                                    compensationRangeResultLength: response.data.compensationRange.length,
                                    totalRangeAmount: totalValue,
                                    errorMessage: ''
                                }       
                            );

                        }

                    })
        
                    .catch((error) => {
                        //
                    });

            } else {
                this.setState( { errorMessage: 'Please fill-up the fields.' } );
            }


        }

    }

    render() {        
        return(    
            <Container style={{marginTop: 30}}>
                <Paper square>
                    <Tabs
                        value={this.state.value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Total Compensation" />
                        <Tab label="Compensation Breakdown" />
                    </Tabs>
                </Paper>

                <Card style={{borderRadius: 0, marginBottom: 20}}>
                    {
                        this.state.componentToShow ? 
                            <CompensationRange 
                                onChangeRangeListener={this.onChangeRangeListener} 
                                onSubmitRangeListener={this.onSubmitRangeListener} 
                                compensationRangeResult={this.state.compensationRangeResult}
                                totalRangeAmount={this.state.totalRangeAmount}
                                compensationRangeResultLength={this.state.compensationRangeResultLength}
                                errorMessage={this.state.errorMessage} /> 
                            
                            : 

                            <CompensationMonth 
                                        onChangeListener={this.onChangeListener}
                                        onSubmitMonthListener={this.onSubmitMonthListener} 
                                        compensationResult={this.state.compensationResult} 
                                        totalMonthAmount={this.state.totalMonthAmount}
                                        compensationResultLength={this.state.compensationResultLength}
                                        errorMessage={this.state.errorMessage} />
                    }
                </Card>
            </Container>
        );
    }
}

export default CompensationHistoryContainer;
