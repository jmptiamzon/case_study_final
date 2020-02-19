import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import LoginModal from './home/LoginModal';
import Button from 'react-bootstrap/Button';
// import swal from 'sweetalert';
import { IoIosLogIn } from 'react-icons/io';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userCredentials: {
                email: '',
                password: ''
            },

            modalState: false,
            errorTextState: false
        };
    }

    handleClose = () => {
        this.setState( { modalState: false } );
    }

    handleOpen = () => {
        this.setState( { modalState: true } );
    }

    onChangeHandler = e => {
        const { name, value } = e.target;

        this.setState((prevState) => ({
            userCredentials: {
                ...prevState.userCredentials,
                [name]: value
            }
        }));
    }

    onSubmitListener = e => {
        e.preventDefault();
        
        const axios = require('axios');
        
        axios.post('http://localhost:8080/login', this.state.userCredentials)
            .then(function(response) {
                this.setState( { modalState: false } );
                // sessionStorage.setItem('user_session', this.state.userCredentials);
            })

            .catch(function(error){

            }); 
    }

    render() {
        return(
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to = { "/" } className = "navbar-brand"> Employment System </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to = { "/" } className = "nav-link" > Home </Link>
                            <Link to = { "/employee" } className = "nav-link" > Employee </Link>
                            <Link to = { "/compensation" } className = "nav-link" > Compensation </Link>
                        </Nav>
    
                        <Nav>
                            <Button variant="link" className = "nav-link" 
                                onClick = { this.handleOpen } > <IoIosLogIn /> Login </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
    
                <LoginModal 
                    open = { this.state.modalState }
                    handleClose = { this.handleClose }
                    onChangeHandler = { this.onChangeHandler }
                    onSubmitListener = { this.onSubmitListener }
                />
            </>
        );
    }
}

export default Header;