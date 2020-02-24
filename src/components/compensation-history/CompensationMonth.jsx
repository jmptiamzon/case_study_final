import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IoMdSearch } from "react-icons/io";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

class CompensationMonth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        }
    }
    
    async componentDidMount() {
        await axios.get('http://localhost:8080/getEmployees')
                .then((response) => {
                    this.setState( { employees: response.data } );
                })

                .catch((error) => {
                    //error
                });
    }

    render() {
        return(
            <>
            <Container>
                <Row style={{marginTop: 10}}>
                    <Col>
                        <Form.Group controlId="formDate">
                            <Form.Label>Month and Year</Form.Label>
                            <Form.Control type="month" name="date" onChange={this.props.onChangeListener} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formEmployee">
                            <Form.Label>Select Employee</Form.Label>
                            <Form.Control as="select"
                                name = "id" 
                                onChange={this.props.onChangeListener} >
                                <option value="">------------</option>
                                {
                                    this.state.employees.map((employee) => {
                                        return(
                                            <option key={employee.id} value={employee.id}>
                                                {employee.firstname + " " + employee.middlename + " " + employee.lastname}
                                            </option>
                                        );
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row style = {{float: 'right'}}>
                    <Col>
                        <Button variant="contained" color="primary" onClick={this.props.onSubmitMonthListener}>
                            <IoMdSearch /> &emsp; Search
                        </Button>
                    </Col>
                </Row>

                <Row style={{marginTop: "10vh", marginBottom: 20}}>
                    <Col>
                        <TableContainer component={Paper}>
                            <Table aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Compensation</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Amount</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {this.props.compensationResultLength !== 0 ? (
                                        this.props.compensationResult.map((result) => {
                                            return(
                                                <TableRow key={result.compId}>
                                                    <TableCell>{result.compType}</TableCell>
                                                    <TableCell>{result.description}</TableCell>
                                                    <TableCell>{result.date}</TableCell>
                                                    <TableCell>{result.amount}</TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )
                                    :
                                    (
                                        <TableRow>
                                            <TableCell>No results found.</TableCell>
                                        </TableRow>
                                    )
                                    }

                                    <TableRow>
                                        <TableCell colSpan={3}>Total</TableCell>
                                        <TableCell>{this.props.totalMonthAmount}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>  
                    </Col>
                </Row>
            </Container>
            </>
        );
    }
}

CompensationMonth.propTypes = {
    onChangeListener: PropTypes.func,
    onSubmitMonthListener: PropTypes.func,
    compensationResult: PropTypes.array,
    totalMonthAmount: PropTypes.number,
    compensationResultLength: PropTypes.number
}

export default CompensationMonth;