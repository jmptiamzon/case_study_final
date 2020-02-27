import React, { Component } from 'react';
import CompensationTable from '../components/compensation/CompensationTable';
import Container from '@material-ui/core/Container';


class CompensationContainer extends Component {
    componentDidMount() {
        if (!sessionStorage.getItem('user_cred')) {
            this.props.history.push('/');
        }
    }
    
    render() {
        return(
            <Container style={{marginTop: 30}}>
                <CompensationTable />
            </Container>
        );
    }
}

export default CompensationContainer;