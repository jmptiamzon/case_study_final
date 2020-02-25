import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types';
import moment from 'moment';

class AddEmployeeModal extends Component {
    
    
    render() {
        return(
            <Modal
            show = { this.props.showAddModal }
            onHide = { this.props.closeAddModal }
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop = "static"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Employees
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
                                onChange = { this.props.onAddChangeHandler } />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                {this.props.errorValidation.firstnameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formMiddlename">
                            <Form.Label>Middlename</Form.Label>
                            <Form.Control type="text" placeholder="Enter middlname" name="middlename" 
                                onChange = { this.props.onAddChangeHandler } />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                {this.props.errorValidation.middlenameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formLastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control type="text" placeholder="Enter lastname" name="lastname" 
                                onChange = { this.props.onAddChangeHandler } />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                {this.props.errorValidation.lastnameError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBirthdate">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control type="date" placeholder="Enter birthdate" name="birthdate" 
                                format="yyyy-mm-dd" onChange = { this.props.onAddChangeHandler } max={moment().format('YYYY-MM-DD')} />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                {this.props.errorValidation.birthdateError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formPosition">
                            <Form.Label>Position</Form.Label>
                            <Form.Control type="text" placeholder="Enter position" name="position" 
                                onChange = { this.props.onAddChangeHandler } />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                {this.props.errorValidation.positionError}
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ this.props.closeAddModal } >
                        Close
                    </Button>

                    <Button variant="primary" onClick = {this.props.onAddSubmitListener}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

AddEmployeeModal.propTypes = {
    onAddChangeHandler: PropTypes.func,
    onAddSubmitListener: PropTypes.func,
    closeAddModal: PropTypes.func,
    showAddModal: PropTypes.bool,
    errorValidation: PropTypes.object
}

export default AddEmployeeModal;