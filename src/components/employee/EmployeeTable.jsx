import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddEmployeeModal from './AddEmployeeModal';
import EditEmployeeModal from './EditEmployeeModal';
import MaterialTable from 'material-table';
import { FaUserPlus } from "react-icons/fa";
import axios from 'axios';
import swal from 'sweetalert';

const END_POINT_URL = 'http://localhost:8081/';

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
            }, 
            errorValidation: {
                firstnameError: '',
                middlenameError: '',
                lastnameError: '',
                birthdateError: '',
                positionError: '',
                formEmptyMessage: ''
            }   
        };
    }

    componentDidMount() {
        axios.get(END_POINT_URL + 'getEmployees')
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
        this.setState( 
            { 
                showAddModal: false,
                errorValidation: {
                    firstnameError: '',
                    middlenameError: '',
                    lastnameError: '',
                    birthdateError: '',
                    positionError: '',
                    formEmptyMessage: ''
                } 
            } 
        );
    }

    openEditModal = employeeData => {
        this.setState( { employeeEditTemp: employeeData } );
        this.setState( { showEditModal: true } );
    }

    closeEditModal = () => {
        this.setState( 
            { 
                showEditModal: false,
                errorValidation: {
                    firstnameError: '',
                    middlenameError: '',
                    lastnameError: '',
                    birthdateError: '',
                    positionError: '',
                    formEmptyMessage: ''
                }  
            } 
        );
    }

    onAddChangeHandler = e => {
        const { name, value } = e.target;
        const errorMessage = this.validationHandler(name, value);

        if (errorMessage.length === 0) {
            this.setState((prevState) => ({
                employeeAddTemp: {
                    ...prevState.employeeAddTemp,
                    [name]: value.trim()
                },

                errorValidation: {
                    ...prevState.errorValidation,
                    formEmptyMessage: '',
                    [name + 'Error']: ''
                }
            }));

        } else {
            this.setState((prevState) => ({
                errorValidation: {
                    ...prevState.errorValidation,
                    formEmptyMessage: '',
                    [name + 'Error']: errorMessage
                }
            }));
        }
    }

    onEditChangeHandler = e => {
        const { name, value } = e.target;
        const errorMessage = this.validationHandler(name, value);

        if (errorMessage.length === 0) {
            this.setState((prevState) => ({
                employeeEditTemp: {
                    ...prevState.employeeEditTemp,
                    [name]: value.trim()
                },

                errorValidation: {
                    ...prevState.errorValidation,
                    formEmptyMessage: '',
                    [name + 'Error']: ''
                }
            }));

        } else {
            this.setState((prevState) => ({
                errorValidation: {
                    ...prevState.errorValidation,
                    formEmptyMessage: '',
                    [name + 'Error']: errorMessage
                }
            }));
        }
    }

    validationHandler = (name, value) => {
        const pattern = /^[a-z ,.'-]+$/i;
        let validate;
        let errorMessage = '';

        if (value.trim().length === 0) {
            if (name !== 'middlename') {
                errorMessage = name.charAt(0).toUpperCase() + name.slice(1) + ' field is required.';
            }
        }

        if (value.trim().length > 0) {
            if (name !== 'birthdate') {
                validate = pattern.test(value);

                if (!validate) {
                    errorMessage = name.charAt(0).toUpperCase() + name.slice(1) + ' must not contain invalid characters.';
                }
             }

            if (name === 'birthdate') {
                if (value.split('-').length === 3) {
                    errorMessage = '';

                } else {
                    errorMessage = 'Please complete the birthdate field.';

                }
            }
        }

        return errorMessage;
    }

    onAddSubmitListener = () => {
        const errorCheck = this.state.errorValidation;
        const fieldToSubmit = this.state.employeeAddTemp;

        if (errorCheck.firstnameError === '' && errorCheck.middlenameError === '' && 
                errorCheck.lastnameError === '' && errorCheck.birthdateError === '' && 
                    errorCheck.positionError === '') {

            if (fieldToSubmit.firstname.trim().length !== 0 && fieldToSubmit.lastname.trim().length !== 0
                && fieldToSubmit.birthdate.trim().length !== 0 && fieldToSubmit.position.trim().length !== 0) {
                    
                axios.post(END_POINT_URL + 'addEmployees', fieldToSubmit)
                .then((response) => {
                    if (response.data.status) {

                        this.setState( 
                            { 
                                errorValidation: {
                                    firstnameError: response.data.firstNameError === null ? '' : response.data.firstNameError,
                                    middlenameError: response.data.middleNameError === null ? '' : response.data.middleNameError,
                                    lastnameError: response.data.lastNameError === null ? '' : response.data.lastNameError,
                                    birthdateError: response.data.birthdateError === null ? '' : response.data.birthdateError,
                                    positionError: response.data.positionError === null ? '' : response.data.positionError,
                                    formEmptyMessage: response.data.userExistsError === null ? '' : response.data.userExistsError    
                                }  
                            } 
                        );

                    } else {
                        //console.log(response);
                        this.closeAddModal();
                        swal('Employee Added!', 'Employee successfully added.', 'success');
                        this.setState( { employees: response.data.employees } );

                    }

                })
                                
                .catch((error) => {
                    // add error handler
                });

            } else {
                this.setState((prevState) => ({
                    errorValidation: {
                        ...prevState.errorValidation,
                        formEmptyMessage: 'Please fill-up every field before you submit.'
                    }
                }));

            }

        }
    }

    onEditSubmitListener = () => {
        const errorCheck = this.state.errorValidation;
        const fieldToSubmit = this.state.employeeEditTemp;

        if (errorCheck.firstnameError === '' && errorCheck.middlenameError === '' && 
        errorCheck.lastnameError === '' && errorCheck.birthdateError === '' && 
            errorCheck.positionError === '') {
                

            if (fieldToSubmit.firstname.trim().length !== 0 && fieldToSubmit.lastname.trim().length !== 0
                && fieldToSubmit.birthdate.trim().length !== 0 && fieldToSubmit.position.trim().length !== 0) {
                    
                axios.post(END_POINT_URL + 'updateEmployees', fieldToSubmit)
                .then((response) => {
                    if (response.data.status) {
                        this.setState( 
                            { 
                                errorValidation: {
                                    firstnameError: response.data.firstNameError === null ? '' : response.data.firstNameError,
                                    middlenameError: response.data.middleNameError === null ? '' : response.data.middleNameError,
                                    lastnameError: response.data.lastNameError === null ? '' : response.data.lastNameError,
                                    birthdateError: response.data.birthdateError === null ? '' : response.data.birthdateError,
                                    positionError: response.data.positionError === null ? '' : response.data.positionError,
                                    formEmptyMessage: response.data.userExistsError === null ? '' : response.data.userExistsError    
                                }  
                            } 
                        );

                    } else {                    
                        this.closeEditModal();
                        swal('Employee Updated!', 'Employee successfully updated.', 'success');
                        this.setState( { employees: response.data.employees } );

                    }
                })
                    
                .catch((error) => {
                    // add error handler
                });

            } else {
                this.setState((prevState) => ({
                    errorValidation: {
                        ...prevState.errorValidation,
                        formEmptyMessage: <h6 style={{ color: "red", fontWeight: "bold" }}>Can't submit an empty form.</h6> 
                    }
                }));

            }
        }
    }

    onDeleteListener = id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, all information related to this reference will also be deleted.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.get(END_POINT_URL + 'removeEmployees/' + id)
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
                <Button variant="contained" color="primary" style={{marginBottom: 10 }} onClick={this.openAddModal}>
                    <FaUserPlus /> &emsp; Add Employees
                </Button>
                
                <MaterialTable
                    title="Employees"
                    columns={[
                        { title: 'ID', field: 'id' },
                        { title: 'Firstname', field: 'firstname' },
                        { title: 'Middlename', field: 'middlename' },
                        { title: 'Lastname', field: 'lastname' },
                        { title: 'Birthdate', field: 'birthdate', type: 'date' },
                        { title: 'Position', field: 'position' },
                    ]}
                    data={this.state.employees}        
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Emplyoee',
                            onClick: (event, rowData) => this.openEditModal(rowData)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Remove Employee',
                            onClick: (event, rowData) => this.onDeleteListener(rowData.id)
                        }
                    ]}
                    options={{
                        exportButton: true,
                        exportFileName: 'Employee_Table_' + new Date(),
                        actionsColumnIndex: -1
                    }}
                />

                <AddEmployeeModal
                    onAddChangeHandler = {this.onAddChangeHandler} 
                    onAddSubmitListener = {this.onAddSubmitListener}
                    closeAddModal = {this.closeAddModal}
                    showAddModal = {this.state.showAddModal}
                    errorValidation = {this.state.errorValidation}
                />

                <EditEmployeeModal
                    onEditChangeHandler = {this.onEditChangeHandler}
                    onEditSubmitListener = {this.onEditSubmitListener}
                    closeEditModal = {this.closeEditModal}
                    showEditModal = {this.state.showEditModal}
                    employees = {this.state.employeeEditTemp}
                    errorValidation = {this.state.errorValidation}
                />

          </>
        );
    }
}

export default EmployeeTable;