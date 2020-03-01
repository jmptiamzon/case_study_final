import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import { FaMoneyBill } from "react-icons/fa";
import axios from 'axios';
import swal from 'sweetalert';
import AddCompensationModal from './AddCompensationModal';
import EditCompensationModal from './EditCompensationModal';

const END_POINT_URL = 'http://localhost:8081/';

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

    componentDidMount() {
        axios.get(END_POINT_URL + 'getCompensation')
            .then((response) => {
                this.setState( { compensations: response.data.compensationList, isLoading: false } );
            })

            .catch((error) => {
                // handle error here
            });

        axios.get(END_POINT_URL + 'getEmployees')
            .then((response) => {
                this.setState( { employees: response.data } );
            })

            .catch((error) => {
                // handle error
            });

        axios.get(END_POINT_URL + 'getCompensationType')
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
        this.setState( 
            { 
                showAddModal: false,
                validationError: {
                    comp_type_idError: '',
                    emp_idError: '',
                    amountError: '',
                    descriptionError: '',
                    dateError: '',
                    errorMessage: ''
                }  
            } 
        );
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
        this.setState( 
            { 
                showEditModal: false,
                validationError: {
                    comp_type_idError: '',
                    emp_idError: '',
                    amountError: '',
                    descriptionError: '',
                    dateError: '',
                    errorMessage: ''
                }  
            } 
        );
    }

    onAddChangeHandler = e => {
        const { name, value } = e.target;
        const errorMessage = this.validationHandler(name, value);
        let errorTitle = '';

        if (name === 'comp_type_id') {
            errorTitle = 'Compensation type ';
        }

        if (name === 'emp_id') {
            errorTitle = 'Employee '
        }

        if (name === 'date') {
            errorTitle = 'Date ';
        }

        if (name === 'amount') {
            errorTitle = 'Amount ';
        }

        if (name === 'description') {
            errorTitle = 'Description ';
        }

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
                    [name+'Error']: errorTitle + errorMessage
                }
            }));
        }

    }

    onEditChangeHandler = e => {
        const { name, value } = e.target;
        const errorMessage = this.validationHandler(name, value);
        let errorTitle = '';

        if (name === 'comp_type_id') {
            errorTitle = 'Compensation type ';
        }

        if (name === 'emp_id') {
            errorTitle = 'Employee '
        }

        if (name === 'date') {
            errorTitle = 'Date ';
        }

        if (name === 'amount') {
            errorTitle = 'Amount ';
        }

        if (name === 'description') {
            errorTitle = 'Description ';
        }
        
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
                    [name+'Error']: errorTitle + errorMessage
                }
            }));
        }
    }

    validationHandler = (name, value) => {
        let errorMessage = '';
        const patternSalary = /^-?\d+(\.\d{1,2})?$/;
        const patternExcludeSalary = /^\d+(\.\d{1,2})?$/;
        
        if (value.trim().length === 0 && name !== 'description' && name !== 'amount') {
            errorMessage = ' field is required.';
        }

        if (name === 'date') {
            if (value.trim().split('-').length < 2) {
                errorMessage = ' must be completed.';
            }
        }

        if (this.state.compensationAddTemp.comp_type_id === '1') {
            if (name === 'amount') {
                if (!patternSalary.test(value)) {
                    errorMessage = ' field contains invalid characters.';
                }
            }

        } 

        if (this.state.compensationAddTemp.comp_type_id !== '1' && this.state.compensationAddTemp.comp_type_id !== '') {
            if (name === 'amount') {
                if (!patternExcludeSalary.test(value)) {
                    errorMessage = ' field contains invalid characters.';
                }

            } 
            
            if (name === 'description') {
                if (value.trim().length === 0) {
                    errorMessage = ' field is required.';
                }

            }
        }
        
        if (this.state.compensationEditTemp.comp_type_id === 1) {
            if (name === 'amount') {
                if (!patternSalary.test(value)) {
                    errorMessage = ' field contains invalid characters.';
                }
            }

        } 
        
        if (this.state.compensationEditTemp.comp_type_id !== 1 && this.state.compensationEditTemp.comp_type_id !== '') {
            if (name === 'amount') {
                if (!patternExcludeSalary.test(value)) {
                    errorMessage = ' field contains invalid characters.';
                }

            } 
            
            if (name === 'description'){
                if (value.trim().length === 0) {
                    errorMessage = ' field is required.';
                }

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
                && fieldToSubmit.amount.trim().length !== 0 && fieldToSubmit.date.trim().length !== 0) {

                    axios.post(END_POINT_URL + 'addCompensation', this.state.compensationAddTemp)
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

            } else {
                this.setState((prevState) => ({
                    validationError: {
                        ...prevState.validationError,
                        errorMessage: 'Please fill-up every field before you submit.'
                    },  
                }));

            }
            
        }

    }

    onEditSubmitListener = () => {
        const errorCheck = this.state.validationError;
        const fieldToSubmit = this.state.compensationEditTemp;
        //console.log(errorCheck);

        if (errorCheck.amountError === '' && errorCheck.descriptionError === '' ) {
            axios.post(END_POINT_URL + 'updateCompensation', fieldToSubmit)
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
                axios.get(END_POINT_URL + 'removeCompensation/' + id)
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
                            exportButton: true,
                            exportFileName: 'Compensation_Table_' + new Date(),
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