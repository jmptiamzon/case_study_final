import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { FaEdit, FaTrash } from "react-icons/fa";


class CompensationTableRow extends Component {

    render() {
        return(
            <>
            <TableRow>
                <TableCell>
                    {this.props.compensation.compId}
                </TableCell>
                <TableCell>
                    {this.props.compensation.compType}
                </TableCell>
                <TableCell>
                    {this.props.compensation.empName}
                </TableCell>
                <TableCell>
                      {this.props.compensation.amount}
                </TableCell>
                <TableCell>
                      {this.props.compensation.description}
                </TableCell>
                <TableCell>
                      {this.props.compensation.date}
                </TableCell>
                <TableCell>
                    <Button variant="contained" color="primary" onClick={() => this.props.openEditModal(this.props.compensation)}>
                        <FaEdit />
                    </Button>
                    &emsp;
                    <Button variant="contained" color="secondary" onClick={() => this.props.onDeleteListener(this.props.compensation.compId)}>
                        <FaTrash />
                    </Button>
                </TableCell>
            </TableRow>
            </>
        );
    }
}

CompensationTableRow.propTypes = {
    compensation: PropTypes.object,
    onDeleteListener: PropTypes.func,
    openEditModal: PropTypes.func
}

export default CompensationTableRow;