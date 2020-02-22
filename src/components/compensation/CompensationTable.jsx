import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FaMoneyBill } from "react-icons/fa";
import axios from 'axios';
import swal from 'sweetalert';
import AddCompensationModal from './AddCompensationModal';
import EditCompensationModal from './EditCompensationModal';
import CompensationTableRow from './CompensationTableRow';

class CompensationTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            compensations: [],
            employees: [],
            compensationTypes: [],
            isLoading: true,
            showAddModal: false,
            showEditModal: false,
            compensationAddTemp: {
                emp_id: '',
                comp_type_id: '',
                amount: '',
                description: '',
                date: ''
            },
            compensationEditTemp: {
                id: '',
                emp_id: '',
                comp_type_id: '',
                amount: '',
                description: '',
                date: ''
            }   
        };
    }

    async componentDidMount() {
        await axios.get('http://localhost:8081/getCompensation')
            .then((response) => {
                this.setState( { compensations: response.data, isLoading: false } );
            })

            .catch((error) => {
                // handle error here
            });

        await axios.get('http://localhost:8081/getEmployees')
            .then((response) => {
                this.setState( { employees: response.data } );
            })

            .catch((error) => {
                // handle error
            });

        await axios.get('http://localhost:8081/getCompensationType')
            .then((response) => {
                this.setState( { compensationTypes: response.data } )
            })

            .catch((error) => {
                // handle error
            });
    }

    openAddModal = () => {
        this.setState( { showAddModal: true } );
    }

    closeAddModal = () => {
        this.setState( { showAddModal: false } );
    }

    openEditModal = compensationData => {
        this.setState({
            compensationEditTemp: {
                id: compensationData.compId,
                emp_id: compensationData.empId,
                comp_type_id: compensationData.compTypeId,
                amount: compensationData.amount,
                description: compensationData.description,
                date: compensationData.date
            }
        });

        this.setState( { showEditModal: true } );
    }

    closeEditModal = () => {
        this.setState( { showEditModal: false } );
    }

    onAddChangeHandler = e => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            compensationAddTemp: {
                ...prevState.compensationAddTemp,
                [name]: value
            }
        }));
    }

    onEditChangeHandler = e => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            compensationEditTemp: {
                ...prevState.compensationEditTemp,
                [name]: value
            }
        }));
    }

    onAddSubmitListener = () => {
        axios.post('http://localhost:8080/addCompensation', this.state.compensationAddTemp)
            .then((response) => {
                    this.closeAddModal();
                    swal('Compensation Added!', 'Compensation has been added successfully.', 'success');
                    this.setState( { compensations: response.data.body } );
            })

            .catch((error) => {
                // error handler
            });
    }

    onEditSubmitListener = () => {
        axios.post('http://localhost:8080/updateCompensation', this.state.compensationEditTemp)
            .then((response) => {
                this.closeEditModal();
                swal('Compensation Updated!', 'Compensation has been updated successfully.', 'success');
                this.setState( { compensations: response.data.body } );
            })

            .catch((error) => {

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
                axios.get('http://localhost:8080/removeCompensation/' + id)
                    .then((response) => { 
                        swal('Compensation Removed!', 'Compensation successfully removed.', 'success');
                        this.setState( { compensations: response.data.body } );
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
                    <FaMoneyBill /> &emsp; Add Compensation
                </Button>

                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Compensation Type</TableCell>
                                <TableCell>Employee Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                        {!this.state.isLoading ? (
                            this.state.compensations.map(compensation => {
                                return(
                                    <CompensationTableRow
                                        key = {compensation.compId} 
                                        compensation = {compensation}
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

            <AddCompensationModal
                employees = {this.state.employees}
                compensationTypes = {this.state.compensationTypes}
                onAddChangeHandler = {this.onAddChangeHandler} 
                onAddSubmitListener = {this.onAddSubmitListener}
                closeAddModal = {this.closeAddModal}
                showAddModal = {this.state.showAddModal}
            />

            <EditCompensationModal
                onEditChangeHandler = {this.onEditChangeHandler}
                onEditSubmitListener = {this.onEditSubmitListener}
                closeEditModal = {this.closeEditModal}
                showEditModal = {this.state.showEditModal}
                employees = {this.state.employees}
                compensationTypes = {this.state.compensationTypes}
                compensationEditTemp = {this.state.compensationEditTemp}
            />

            </>
        );
    }
}

export default CompensationTable;