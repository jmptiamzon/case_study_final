import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CompensationMonth  from '../components/compensation-history/CompensationMonth';
import CompensationRange  from '../components/compensation-history/CompensationRange';
import axios from 'axios';

class CompensationHistoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            totalMonthAmount: 0,
            totalRangeAmount: 0,
            compensationResultLength: 0,
            compensationRangeResultLength: 0,
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
            this.setState( { componentToShow: true } )
        }

        if (newValue === 1) {
            this.setState( { componentToShow: false } );
        }

        this.setState( { value: newValue } );
    }

    onChangeListener = e => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            compensationMonthData: {
                ...prevState.compensationMonthData,
                [name]: value
            }
        }));
    }

    onChangeRangeListener = e => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            compensationRangeData: {
                ...prevState.compensationRangeData,
                [name]: value
            }
        }));
    }

    onSubmitMonthListener = () => {
        let totalValue = 0;

        axios.post('http://localhost:8080/getCompensationMonth', this.state.compensationMonthData)
            .then((response) => {
                response.data.map((result) => totalValue = result.amount + totalValue);
                // console.log(response.data);
                this.setState( 
                    { 
                        compensationResult: response.data, 
                        totalMonthAmount: totalValue,
                        compensationResultLength: response.data.length
                    } 
                );
            })

            .catch((error) => {
                // handle error
            });
    }

    onSubmitRangeListener = () => {
        let totalValue = 0;

        axios.post('http://localhost:8080/getCompensationRange', this.state.compensationRangeData)
            .then((response) => {
                response.data.map((result) => 
                    totalValue = totalValue + result.amount
                );

                this.setState( 
                    { 
                        compensationRangeResult: response.data,  
                        compensationRangeResultLength: response.data.length,
                        totalRangeAmount: totalValue
                    } 
                );
            })

            .catch((error) => {
                //
            });
    }

    render() {        
        return(    
            <>
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
                                compensationRangeResultLength={this.state.compensationRangeResultLength} /> 
                            
                            : 

                            <CompensationMonth 
                                        onChangeListener={this.onChangeListener}
                                        onSubmitMonthListener={this.onSubmitMonthListener} 
                                        compensationResult={this.state.compensationResult} 
                                        totalMonthAmount={this.state.totalMonthAmount}
                                        compensationResultLength={this.state.compensationResultLength} />
                    }
                </Card>
            </>
        );
    }
}

export default CompensationHistoryContainer;
