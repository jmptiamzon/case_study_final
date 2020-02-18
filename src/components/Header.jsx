import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import LoginModal from './home/LoginModal';
import Button from 'react-bootstrap/Button';
import { IoIosLogIn } from 'react-icons/io';
import { Link } from 'react-router-dom';

function Header() {

    const [ open, setOpen ] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const onChangeHandler = e => {
        // 
    }

    const onSubmitListener = e => {
        
    }

    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Link to = { "/" } className = "navbar-brand"> Awit </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to = { "/" } className = "nav-link" > Home </Link>
                        <Link to = { "/employee" } className = "nav-link" > Employee </Link>
                    </Nav>

                    <Nav>
                        <Button variant="link" className = "nav-link" 
                            onClick = { handleOpen } > <IoIosLogIn /> Login </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <LoginModal 
                open = { open }
                handleClose = { handleClose }
                onChangeHandler = { onChangeHandler }
                onSubmitListener = { onSubmitListener }
            />
        </>
    );
}

export default Header;