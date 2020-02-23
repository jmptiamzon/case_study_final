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
            compensationResultLength: 0,
            componentToShow: <CompensationRange />,
            compensationResult: [],
            compensationMonthData: {
                date: '',
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

    onSubmitMonthListener = () => {
        let totalValue = 0;

        axios.post('http://localhost:8081/getCompensationMonth', this.state.compensationMonthData)
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
                        <Tab label="Total Compensation (Range)" />
                        <Tab label="Total Compensation (Month)" />
                    </Tabs>
                </Paper>

                <Card style={{borderRadius: 0, marginBottom: 20}}>
                    {
                        this.state.componentToShow ? 
                            <CompensationRange /> : 

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
