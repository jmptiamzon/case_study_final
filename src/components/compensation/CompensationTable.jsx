import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import MaterialTable from 'material-table';
import { FaMoneyBill } from "react-icons/fa";
import axios from 'axios';
import swal from 'sweetalert';
import AddCompensationModal from './AddCompensationModal';
import EditCompensationModal from './EditCompensationModal';
// import CompensationTableRow from './CompensationTableRow';

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
            },
            validationError: {
                comp_type_idError: '',
                emp_idError: '',
                amountError: '',
                descriptionError: '',
                dateError: '',
                errorMessage: ''
            } 
        };
    }

    async componentDidMount() {
        await axios.get('http://localhost:8080/getCompensation')
            .then((response) => {
                this.setState( { compensations: response.data.compensationList, isLoading: false } );
            })

            .catch((error) => {
                // handle error here
            });

        await axios.get('http://localhost:8080/getEmployees')
            .then((response) => {
                this.setState( { employees: response.data } );
            })

            .catch((error) => {
                // handle error
            });

        await axios.get('http://localhost:8080/getCompensationType')
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
        const errorMessage = this.validationHandler(name, value);

        if (errorMessage.length === 0) {
            this.setState((prevState) => ({
                compensationAddTemp: {
                    ...prevState.compensationAddTemp,
                    [name]: value
                },

                validationError: {
                    ...prevState.validationError,
                    errorMessage: '',
                    [name+'Error']: ''
                }
            }));

        } else {
            this.setState((prevState) => ({
                validationError: {
                    ...prevState.validationError,
                    errorMessage: '',
                    [name+'Error']: errorMessage
                }
            }));
        }


    }

    onEditChangeHandler = e => {
        const { name, value } = e.target;
        const errorMessage = this.validationHandler(name, value);

        if (errorMessage.length === 0) {
            this.setState((prevState) => ({
                compensationEditTemp: {
                    ...prevState.compensationEditTemp,
                    [name]: value
                },

                validationError: {
                    ...prevState.validationError,
                    errorMessage: '',
                    [name+'Error']: ''
                }
            }));

        } else {
            this.setState((prevState) => ({
                validationError: {
                    ...prevState.validationError,
                    errorMessage: '',
                    [name+'Error']: errorMessage
                }
            }));
        }
    }

    validationHandler = (name, value) => {
        let errorMessage = '';
        
        if (value.trim().length === 0) {
            errorMessage = ' field is required.';
        }

        if (name === 'date') {
            if (value.trim().split('-').length < 2) {
                errorMessage = ' must be completed.';
            }
        }

        return errorMessage;
    }

    onAddSubmitListener = () => {
        const errorCheck = this.state.validationError;
        const fieldToSubmit = this.state.compensationAddTemp;

        if (errorCheck.comp_type_idError === '' && errorCheck.emp_idError === '' && 
            errorCheck.amountError === '' && errorCheck.descriptionError === '' && 
            errorCheck.dateError === '') {

            if (fieldToSubmit.emp_id.trim().length !== 0 && fieldToSubmit.comp_type_id.trim().length !== 0
                && fieldToSubmit.amount.trim().length !== 0 && fieldToSubmit.description.trim().length !== 0
                && fieldToSubmit.date.trim().length !== 0) {

                    axios.post('http://localhost:8080/addCompensation', this.state.compensationAddTemp)
                    .then((response) => {
                        if (response.data.status) {
                            this.setState( 
                                {  
                                    validationError: {
                                        comp_type_idError: response.data.compTypeError === null ? '' : response.data.compTypeError,
                                        emp_idError: response.data.empIdError === null ? '' : response.data.empIdError,
                                        amountError: response.data.amountError === null ? '' : response.data.amountError,
                                        descriptionError: response.data.descriptionError === null ? '' : response.data.descriptionError,
                                        dateError:  response.data.dateError === null ? '' : response.data.dateError,
                                        errorMessage: response.data.errorMessage === null ? '' : response.data.errorMessage,
                                    },
                                } 
                            );
        
                        } else {
                            this.setState( 
                                {  
                                    compensations: response.data.compensationList,
                                    validationError: {
                                        comp_type_idError: '',
                                        emp_idError: '',
                                        amountError: '',
                                        descriptionError: '',
                                        dateError:  '',
                                        errorMessage: ''
                                    }
                                } 
                            );
                            
                            this.closeAddModal();
                            swal('Compensation Added!', 'Compensation has been added successfully.', 'success');
                        }
        
                    })
        
                    .catch((error) => {
                        // error handler
                    });
            }
            
        }

    }

    onEditSubmitListener = () => {
        const errorCheck = this.state.validationError;
        const fieldToSubmit = this.state.compensationEditTemp;

        if (errorCheck.amountError === '' && errorCheck.descriptionError === '' ) {

            if (fieldToSubmit.description.trim().length !== 0) {
                    axios.post('http://localhost:8080/updateCompensation', this.state.compensationEditTemp)
                    .then((response) => {
                        if (response.data.status) {
                            this.setState( 
                                {  
                                    validationError: {
                                        comp_type_idError: response.data.compTypeError === null ? '' : response.data.compTypeError,
                                        emp_idError: response.data.empIdError === null ? '' : response.data.empIdError,
                                        amountError: response.data.amountError === null ? '' : response.data.amountError,
                                        descriptionError: response.data.descriptionError === null ? '' : response.data.descriptionError,
                                        dateError:  response.data.dateError === null ? '' : response.data.dateError,
                                        errorMessage: response.data.errorMessage === null ? '' : response.data.errorMessage,
                                    },
                                } 
                            );
        
                        } else {
                            this.setState( 
                                {  
                                    compensations: response.data.compensationList,
                                    validationError: {
                                        comp_type_idError: '',
                                        emp_idError: '',
                                        amountError: '',
                                        descriptionError: '',
                                        dateError:  '',
                                        errorMessage: ''
                                    }
                                } 
                            );
                            
                            this.closeEditModal();
                            swal('Compensation Updated!', 'Compensation has been updated successfully.', 'success');
                        }
        
                    })
        
                    .catch((error) => {
                        //asd
                    });

            }

        }
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
                        this.setState( { compensations: response.data.compensationList } );
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
                <Button variant="contained" color="primary" style = {{marginBottom: 10}} onClick={this.openAddModal}>
                    <FaMoneyBill /> &emsp; Add Compensation
                </Button>

                <MaterialTable
                        title="Compensations"
                        columns={[
                            { title: 'ID', field: 'compId' },
                            { title: 'Compensation Type', field: 'compType' },
                            { title: 'Employee Name', field: 'empName' },
                            { title: 'Amount', field: 'amount' },
                            { title: 'Description', field: 'description' },
                            { title: 'Date', field: 'date', type: 'date' },
                        ]}
                        data={this.state.compensations}        
                        actions={[
                            {
                            icon: 'edit',
                            tooltip: 'Edit Compensation',
                            onClick: (event, rowData) => this.openEditModal(rowData)
                            },
                            {
                                icon: 'delete',
                                tooltip: 'Remove Compensation',
                                onClick: (event, rowData) => this.onDeleteListener(rowData.compId)
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                />

                <AddCompensationModal
                    employees = {this.state.employees}
                    compensationTypes = {this.state.compensationTypes}
                    onAddChangeHandler = {this.onAddChangeHandler} 
                    onAddSubmitListener = {this.onAddSubmitListener}
                    closeAddModal = {this.closeAddModal}
                    showAddModal = {this.state.showAddModal}
                    validationError = {this.state.validationError}
                />

                <EditCompensationModal
                    onEditChangeHandler = {this.onEditChangeHandler}
                    onEditSubmitListener = {this.onEditSubmitListener}
                    closeEditModal = {this.closeEditModal}
                    showEditModal = {this.state.showEditModal}
                    employees = {this.state.employees}
                    compensationTypes = {this.state.compensationTypes}
                    compensationEditTemp = {this.state.compensationEditTemp}
                    validationError = {this.state.validationError}
                />

            </>
        );
    }
}

export default CompensationTable;