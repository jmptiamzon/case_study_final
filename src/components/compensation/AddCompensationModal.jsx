import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types';

class AddCompensationModal extends Component {

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
                        Add Compensation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{height: 350, overflowY: "auto"}}>
                    <Form>
                        <h6 style={{color: "red", fontWeight: "bold"}} >    
                            {this.props.validationError.errorMessage}
                        </h6>

                        <Form.Group controlId="formCompType">
                            <Form.Label>Select Compensation Type</Form.Label>
                            <Form.Control as="select"
                                onChange = { this.props.onAddChangeHandler }
                                name = "comp_type_id" >
                                <option value="">------------</option>
                                {
                                    this.props.compensationTypes.map((compType) => {
                                        return(
                                            <option key={compType.id} value={compType.id}>{compType.comptype}</option>
                                        );
                                    })
                                }
                            </Form.Control>
                            <Form.Text style={{color: "red", fontWeight: "bold"}}>
                                {this.props.validationError.comp_type_idError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formEmployee">
                            <Form.Label>Select Employee</Form.Label>
                            <Form.Control as="select"
                                onChange = { this.props.onAddChangeHandler }
                                name = "emp_id" >
                                <option value="">------------</option>
                                {
                                    this.props.employees.map((employee) => {
                                        return(
                                            <option key={employee.id} value={employee.id} >
                                                {employee.firstname + " " + employee.middlename + " " + employee.lastname}
                                            </option>
                                        );
                                    })
                                }
                            </Form.Control>
                            <Form.Text style={{color: "red", fontWeight: "bold"}}>
                                {this.props.validationError.emp_idError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" placeholder="Enter amount" name="amount" 
                                onChange = { this.props.onAddChangeHandler } />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                {this.props.validationError.amountError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" name="description" 
                                onChange = { this.props.onAddChangeHandler } />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                {this.props.validationError.descriptionError}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter date" name="date" 
                                format="yyyy-mm-dd" onChange = { this.props.onAddChangeHandler } />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                {this.props.validationError.dateError}
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

AddCompensationModal.propTypes = {
    employees: PropTypes.array,
    compensationTypes: PropTypes.array,
    onAddChangeHandler: PropTypes.func, 
    onAddSubmitListener: PropTypes.func,
    closeAddModal: PropTypes.func,
    showAddModal: PropTypes.bool,
    validationError: PropTypes.object
}

export default AddCompensationModal;

