import React, { Component } from 'react';
import EmployeeTable from '../components/employee/EmployeeTable';
import Container from '@material-ui/core/Container';

class EmployeeContainer extends Component {
    componentDidMount() {
        if (!sessionStorage.getItem('user_cred')) {
            this.props.history.push('/');
        }
    }

    render() {
        return(
            <Container style={{marginTop: 30}}>
                <EmployeeTable />
                <br></br>
            </Container>
        );
    }
}

export default EmployeeContainer;

