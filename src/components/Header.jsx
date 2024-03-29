import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import LoginModal from './home/LoginModal';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import { Link, withRouter } from 'react-router-dom';

const END_POINT_URL = 'http://localhost:8081/';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userCredentials: {
                email: '',
                password: ''
            },
            openAlert: false,
            loginError: false,
            modalState: false,
            errorTextState: false,
            employeeLink: '',
            compensationLink: '',
            compensationHistoryLink: '',
            logoutLoginLink: <Button variant="link" className = "nav-link" 
                                    onClick = { this.handleOpen } > <IoIosLogIn /> Login </Button>
        };
    }

    componentDidMount() {        
        if (sessionStorage.getItem('user_cred')) {
            this.setState( 
                { 
                    employeeLink: <Link to = { "/employee" } className = "nav-link" > Employee </Link>, 
                    compensationLink: <Link to = { "/compensation" } className = "nav-link" > Compensation </Link>,
                    compensationHistoryLink: <Link to = { "/compensation-history" } className = "nav-link" > Compensation History </Link>,
                    logoutLoginLink: <Button variant="link" className = "nav-link" 
                                         onClick = { this.onLogoutListener } > <IoIosLogOut /> Logout </Button>
                } 
            );
        } 

    }

    handleClose = () => {
        this.setState( { modalState: false, loginError: false } );
    }

    handleOpen = () => {
        this.setState( { modalState: true } );
    }

    alertClose = () => {
        this.setState( { openAlert: false } );
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

    onSubmitListener = () => {
        const axios = require('axios');

        axios.post(END_POINT_URL + 'login', this.state.userCredentials)
            .then(response => {
                if (response.data.status) {
                    this.setState( 
                        { 
                            loginError: false,
                            modalState: false, 
                            employeeLink: <Link to = { "/employee" } className = "nav-link" > Employee </Link>, 
                            compensationLink: <Link to = { "/compensation" } className = "nav-link" > Compensation </Link>,
                            compensationHistoryLink: <Link to = { "/compensation-history" } className = "nav-link" > Compensation History </Link>,
                            logoutLoginLink: <Button variant="link" className = "nav-link" 
                                                 onClick = { this.onLogoutListener } > <IoIosLogOut /> Logout </Button>
                        } 
                    );
                    sessionStorage.setItem('user_cred', this.state.userCredentials);
                    this.setState( { openAlert: true } );
                    // add localStorage here

                } else {
                    // add validation here | dont close the modal | add message under input
                    this.setState( { loginError: true } );

                }
            })

            .catch(error => {
                // add validation here (backend)
                console.log(error);
            }); 
    }

    onLogoutListener = () => {
        swal({
            title: "Are you sure you want to logout?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                this.setState( 
                    { 
                        employeeLink: '', 
                        compensationLink: '',
                        compensationHistoryLink: '',
                        logoutLoginLink: <Button variant="link" className = "nav-link" 
                                            onClick = { this.handleOpen } > <IoIosLogIn /> Login </Button>
                    } 
                );
                
                sessionStorage.removeItem('user_cred');
                this.props.history.push('/');
            } 
          });
    }

    render() {
        const vertical = 'bottom';
        const horizontal = 'right';

        return(
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link to = { "/" } className = "navbar-brand"> Employment System </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to = { "/" } className = "nav-link" > Home </Link>
                            {this.state.employeeLink}
                            {this.state.compensationLink}
                            {this.state.compensationHistoryLink}
                        </Nav>
    
                        <Nav>
                            {this.state.logoutLoginLink}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
    
                <LoginModal 
                    open = { this.state.modalState }
                    handleClose = { this.handleClose }
                    onChangeHandler = { this.onChangeHandler }
                    onSubmitListener = { this.onSubmitListener }
                    loginError = { this.state.loginError }
                />

                <Snackbar 
                    anchorOrigin={{ vertical, horizontal }}
                    key={`${vertical}, ${horizontal}`}
                    open={this.state.openAlert} 
                    autoHideDuration={6000} 
                    onClose={this.alertClose} >

                    <Alert onClose={this.alertClose} severity="success">
                        User successfully logged in!
                    </Alert>

                </Snackbar>
            </>
        );
    }
}

export default withRouter(Header);