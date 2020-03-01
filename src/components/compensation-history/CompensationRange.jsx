import React, { Component, Fragment } from 'react';
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

const END_POINT_URL = 'http://localhost:8081/';

class CompensationRange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: []
        };
    }

    componentDidMount() {
        axios.get(END_POINT_URL + 'getEmployees')
            .then((response) => {
                this.setState( { employees: response.data } );
            })

            .catch((error) => {

            });
    }


    render() {
        return(
            <>
            <Container>
                <Row style={{marginTop: 10}}>
                    <Col>
                        <Form.Group controlId="formStartDate">
                            <Form.Label>Start Month and Year</Form.Label>
                            <Form.Control type="month" name="startDate" onChange={this.props.onChangeRangeListener} />
                            <Form.Text style={{color: "red", fontWeight: "bold"}}>
                                {this.props.errorMessage}
                            </Form.Text>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formEndDate">
                            <Form.Label>End Month and Year</Form.Label>
                            <Form.Control type="month" name="endDate" onChange={this.props.onChangeRangeListener} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formEmployee">
                            <Form.Label>Select Employee</Form.Label>
                            <Form.Control as="select"
                                name = "id" 
                                onChange={this.props.onChangeRangeListener} >
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
                        <Button variant="contained" color="primary" onClick={this.props.onSubmitRangeListener}>
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
                                        <TableCell>Month and Year</TableCell>
                                        <TableCell>Amount</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {this.props.compensationRangeResultLength !== 0 ? (
                                        Object.keys(this.props.compensationRangeResult.compensationRange).map((key, i) => 
                                            this.props.compensationRangeResult.compensationRange[key].map((result, ctr, arr) => {
                                                if (arr.length - 1 === ctr) {
                                                    return(
                                                        <Fragment key={key}>
                                                            <TableRow key={result.id}>
                                                                <TableCell>{result.month}{' '}{result.year}</TableCell>
                                                                <TableCell>{result.amount}</TableCell>
                                                            </TableRow>

                                                            <TableRow key={key + '_final'}>
                                                                <TableCell><b>Total</b></TableCell>
                                                                <TableCell><b>{this.props.compensationRangeResult.totalAmountYear[key]}</b></TableCell>
                                                            </TableRow>
                                                        </Fragment>
                                                    );

                                                } else {
                                                    return(
                                                        <TableRow key={result.id}>
                                                            <TableCell>{result.month}{' '}{result.year}</TableCell>
                                                            <TableCell>{result.amount}</TableCell>
                                                        </TableRow>
                                                    );
                                                }
                                                
                                            })
                                        )
                                    )
                                    :
                                    (
                                        <TableRow>
                                            <TableCell>No results found.</TableCell>
                                        </TableRow>
                                    )
                                    }
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

CompensationRange.propTypes = {
    onChangeRangeListener: PropTypes.func,
    onSubmitRangeListener: PropTypes.func,
    compensationRangeResult: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    totalRangeAmount: PropTypes.number,
    compensationRangeResultLength: PropTypes.number,
    errorMessage: PropTypes.string
}

export default CompensationRange;