import React, { Component } from 'react';
import EmployeeTableRow from '../employee/EmployeeTableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import Card from '@material-ui/core/Card';

class EmployeeTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            isLoading: true,
            showAddModal: false,
            showEditModal: false
        };
    }

    async componentDidMount() {
        const axios = require('axios');

        let employeeData = await axios.get('http://localhost:8080/getEmployees');
        this.setState( { isLoading: false, employees: employeeData.data } );
    }

    openCloseAddModal = () => {
        const flag = !this.state.show ? true : false;
        this.setState( { showAddModal: flag } );
    }

    openCloseEditModal = () => {
        const flag = !this.state.show ? true : false;
        this.setState( { showEditModal: flag } );
    }

    render() {
        return(
            <TableContainer component={Paper} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Firstname</TableCell>
                            <TableCell>Middlename</TableCell>
                            <TableCell>Lastname</TableCell>
                            <TableCell>Birthdate</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                    {!this.state.isLoading ? (
                        this.state.employees.map(employee => {
                            return(
                                <EmployeeTableRow
                                    key = {employee.id} 
                                    employees = {employee}
                                    
                                />
                            );
                        })
                    ) :
                    (   
                        <TableRow>
                            <TableCell>
                                ok la
                            </TableCell>
                        </TableRow>
                    )
                    }

                    </TableBody>
                </Table>
          </TableContainer>
        );
    }
}

export default EmployeeTable;