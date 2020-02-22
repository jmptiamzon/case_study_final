import React, { Component } from 'react';
import CompensationTable from '../components/compensation/CompensationTable';


class CompensationContainer extends Component {
    componentDidMount() {
        if (!sessionStorage.getItem('user_cred')) {
            this.props.history.push('/');
        }
    }
    
    render() {
        return(
            <CompensationTable />
        );
    }
}

export default CompensationContainer;