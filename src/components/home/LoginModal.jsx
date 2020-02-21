import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types';

class LoginModal extends Component {
    render() {
        return(
            <Modal
            show = { this.props.open }
            onHide = { this.props.handleClose }
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop = "static"
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" 
                                onChange = { this.props.onChangeHandler } />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" 
                                onChange = { this.props.onChangeHandler } />
                            <Form.Text style={{ color: "red", fontWeight: "bold" }}>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose} >
                        Close
                    </Button>

                    <Button variant="primary" onClick = {this.props.onSubmitListener}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>

        );
    }
}

LoginModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    onChangeHandler: PropTypes.func,
    onSubmitListener: PropTypes.func
}

export default LoginModal;