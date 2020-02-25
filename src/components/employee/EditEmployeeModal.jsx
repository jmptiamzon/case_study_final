import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types';

class EditEmployeeModal extends Component {
    render() {
        return(
            <Modal
            show = { this.props.showEditModal }
            onHide = { this.props.closeEditModal }
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop = "static"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Employee
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{height: 350, overflowY: "auto"}}>
                    <Form>
                        <h6 style={{color: "red", fontWeight: "bold"}} >
                            {this.props.errorValidation.formEmptyMessage}
                        </h6>
                        <Form.Group controlId="formFirstname">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control type="text" placeholder="Enter firstname" name="firstname" 
                                onChange = { this.props.onEditChangeHandler } defaultValue = {this.props.employees.firstname} />
                            <Form.Text style={{color: "red", fontWeight: "bold"}}>
                                {this.props.errorValidation.firstnameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formMiddlename">
                            <Form.Label>Middlename</Form.Label>
                            <Form.Control type="text" placeholder="Enter middlname" name="middlename" 
                                onChange = { this.props.onEditChangeHandler } defaultValue = {this.props.employees.middlename} />
                            <Form.Text style={{color: "red", fontWeight: "bold"}} >
                                {this.props.errorValidation.middlenameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formLastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control type="text" placeholder="Enter lastname" name="lastname" 
                                onChange = { this.props.onEditChangeHandler } defaultValue = {this.props.employees.lastname} />
                            <Form.Text style={{color: "red", fontWeight: "bold"}} >
                                {this.props.errorValidation.lastnameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBirthdate">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control type="date" placeholder="Enter birthdate" name="birthdate" 
                                format="yyyy-mm-dd" onChange = { this.props.onEditChangeHandler } defaultValue = {this.props.employees.birthdate} />
                            <Form.Text style={{color: "red", fontWeight: "bold"}} >
                                {this.props.errorValidation.birthdateError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formPosition">
                            <Form.Label>Position</Form.Label>
                            <Form.Control type="text" placeholder="Enter position" name="position" 
                                onChange = { this.props.onEditChangeHandler }  defaultValue = {this.props.employees.position} />
                            <Form.Text style={{color: "red", fontWeight: "bold"}}>
                                {this.props.errorValidation.positionError}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ this.props.closeEditModal } >
                        Close
                    </Button>

                    <Button variant="primary" onClick = {this.props.onEditSubmitListener}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

EditEmployeeModal.propTypes = {
    onEditChangeHandler: PropTypes.func,
    onEditSubmitListener: PropTypes.func,
    closeEditModal: PropTypes.func,
    showEditModal: PropTypes.bool,
    employees: PropTypes.object,
    errorValidation: PropTypes.object
}

export default EditEmployeeModal;