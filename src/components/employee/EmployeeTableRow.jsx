import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { FaEdit, FaTrash } from "react-icons/fa";

class EmployeeTableRow extends Component {
    render(){
        return(
            <>
            <TableRow>
                <TableCell>
                    {this.props.employees.id}
                </TableCell>
                <TableCell>
                      {this.props.employees.firstname}
                </TableCell>
                <TableCell>
                      {this.props.employees.middlename}
                </TableCell>
                <TableCell>
                      {this.props.employees.lastname}
                </TableCell>
                <TableCell>
                      {this.props.employees.birthdate}
                </TableCell>
                <TableCell>
                      {this.props.employees.position}
                </TableCell>
                <TableCell>
                    <Button variant="contained" color="primary" onClick={() => this.props.openEditModal(this.props.employees)}>
                        <FaEdit />
                    </Button>
                    &emsp;
                    <Button variant="contained" color="secondary" onClick={this.props.onDeleteListener}>
                        <FaTrash />
                    </Button>
                </TableCell>
            </TableRow>
            </>
        );
    }
}

EmployeeTableRow.propTypes = {
    employees: PropTypes.object,
    onDeleteListener: PropTypes.func,
    openEditModal: PropTypes.func
}

export default EmployeeTableRow;