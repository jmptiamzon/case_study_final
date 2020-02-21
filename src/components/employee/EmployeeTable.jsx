import React, { Component } from 'react';
import EmployeeTableRow from '../employee/EmployeeTableRow';
import Button from '@material-ui/core/Button';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FaUserPlus } from "react-icons/fa";
import axios from 'axios';
import swal from 'sweetalert';

//import Card from '@material-ui/core/Card';

class EmployeeTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            isLoading: true,
            showAddModal: false,
            showEditModal: false,
            employeeAddTemp: {
                firstname: '',
                middlename: '',
                lastname: '',
                birthdate: '',
                position: ''
            },
            employeeEditTemp: {
                id: 0,
                firstname: '',
                middlename: '',
                lastname: '',
                birthdate: '',
                position: ''
            }   
        };
    }

    async componentDidMount() {
        await axios.get('http://localhost:8080/getEmployees')
            .then((response) => {
                this.setState( { isLoading: false, employees: response.data } );
            })

            .catch((error) => {
                // add error handler
            });
    }

    openAddModal = () => {
        this.setState( { showAddModal: true } );
    }

    closeAddModal = () => {
        this.setState( { showAddModal: false } );
    }

    openEditModal = employeeData => {
        this.setState( { employeeEditTemp: employeeData } );
        this.setState( { showEditModal: true } );
    }

    closeEditModal = () => {
        this.setState( { showEditModal: false } );
    }

    onAddChangeHandler = e => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            employeeAddTemp: {
                ...prevState.employeeAddTemp,
                [name]: value
            }
        }));
    }

    onEditChangeHandler = e => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            employeeEditTemp: {
                ...prevState.employeeEditTemp,
                [name]: value
            }
        }));
    }

    onAddSubmitListener = () => {
        axios.post('http://localhost:8080/addEmployees', this.state.employeeAddTemp)
            .then((response) => {
                this.closeAddModal();
                swal('Employee Added!', 'Employee successfully added.', 'success');
                this.setState( { employees: response.data.body } );
            })
            
            .catch((error) => {
                // add error handler
            });
    }

    onEditSubmitListener = () => {
        axios.post('http://localhost:8080/updateEmployees', this.state.employeeEditTemp)
            .then((response) => {
                this.closeEditModal();
                swal('Employee Updated!', 'Employee successfully updated.', 'success');
                this.setState( { employees: response.data.body } );
            })
            
            .catch((error) => {
                // add error handler
            });
    }

    onDeleteListener = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to undo the process.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.get('http://localhost:8080/removeEmployees/' + id)
                    .then((response) => { 
                        swal('Employee Removed!', 'Employee successfully removed.', 'success');
                        this.setState( { employees: response.data.body } );
                    })
    
                    .catch((error) => {
                        // error handler
                    });
            } 
          });
    }

    render() {
        return(
            <>
                <Button variant="contained" color="primary" style = {{marginBottom: 10, float: "right"}} onClick={this.openAddModal}>
                    <FaUserPlus /> &emsp; Add Employees
                </Button>

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
                                        onDeleteListener = {this.onDeleteListener}
                                        openEditModal = {this.openEditModal}
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

            <AddEmployeeModal
                onAddChangeHandler = {this.onAddChangeHandler} 
                onAddSubmitListener = {this.onAddSubmitListener}
                closeAddModal = {this.closeAddModal}
                showAddModal = {this.state.showAddModal}
            />

            <EditEmployeeModal
                onEditChangeHandler = {this.onEditChangeHandler}
                onEditSubmitListener = {this.onEditSubmitListener}
                closeEditModal = {this.closeEditModal}
                showEditModal = {this.state.showEditModal}
                employees = {this.state.employeeEditTemp}
            />
          </>
        );
    }
}

export default EmployeeTable;