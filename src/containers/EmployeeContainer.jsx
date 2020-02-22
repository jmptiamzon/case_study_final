import React, { Component } from 'react';
import EmployeeTable from '../components/employee/EmployeeTable';

class EmployeeContainer extends Component {
    componentDidMount() {
        if (!sessionStorage.getItem('user_cred')) {
            this.props.history.push('/');
        }
    }

    render() {
        return(
            <EmployeeTable />
        );
    }
}

export default EmployeeContainer;

