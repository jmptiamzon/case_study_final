import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types';

class EditCompensationModal extends Component {

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
                        Edit Compensation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{height: 350, overflowY: "auto"}}>
                    <Form>
                        <Form.Group controlId="formCompType">
                            <Form.Label>Select Compensation Type</Form.Label>
                            <Form.Control as="select"
                                onChange = { this.props.onEditChangeHandler }
                                name = "comp_type_id" 
                                defaultValue={this.props.compensationEditTemp.comp_type_id}>
                                <option value="">------------</option>
                                {
                                    this.props.compensationTypes.map((compType) => {
                                        return(
                                            <option value={compType.id}>{compType.comptype}</option>
                                        );
                                    })
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formEmployee">
                            <Form.Label>Select Employee</Form.Label>
                            <Form.Control as="select"
                                onChange = { this.props.onEditChangeHandler }
                                name = "emp_id" 
                                defaultValue={this.props.compensationEditTemp.emp_id} >
                                <option value="">------------</option>
                                {
                                    this.props.employees.map((employee) => {
                                        return(
                                            <option value={employee.id}>
                                                {employee.firstname + " " + employee.middlename + " " + employee.lastname}
                                            </option>
                                        );
                                    })
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" placeholder="Enter amount" name="amount" 
                                onChange = { this.props.onEditChangeHandler } defaultValue={this.props.compensationEditTemp.amount}/>
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                Error
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" name="description" 
                                onChange = { this.props.onEditChangeHandler } defaultValue={this.props.compensationEditTemp.description} />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                Error
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter date" name="date" 
                                format="yyyy-mm-dd" onChange = { this.props.onEditChangeHandler } defaultValue={this.props.compensationEditTemp.date} />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                Error
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

EditCompensationModal.propTypes = {
    onEditChangeHandler: PropTypes.func,
    onEditSubmitListener: PropTypes.func,
    closeEditModal: PropTypes.func,
    showEditModal: PropTypes.bool,
    employees: PropTypes.array,
    compensationTypes: PropTypes.array,
    compensationEditTemp: PropTypes.object
}

export default EditCompensationModal;