import React, {ChangeEvent} from "react";
import TableRow from "../Table/TableElements/TableRow";
import TableCell from "../Table/TableElements/TableCell";

interface IProps {
    inputsHandler(e: ChangeEvent<HTMLInputElement>): void,

    values: any,
}

const AddRow: React.FC<IProps> = ({inputsHandler, values}) => {
    return (
        <TableRow>
            <TableCell className='add_row_input_container'>
                <input
                    className='add_row_input'
                    name='id'
                    type='number'
                    placeholder='id'
                    onChange={inputsHandler}
                    value={values.id}
                />
            </TableCell>
            <TableCell  className='add_row_input_container' align="left">
                <input
                    className='add_row_input'
                    name='firstName'
                    type='text'
                    placeholder='first name'
                    onChange={inputsHandler}
                    value={values.firstName}
                />
            </TableCell>
            <TableCell className='add_row_input_container' align="left">
                <input
                    className='add_row_input'
                    name='lastName'
                    type='text'
                    placeholder='last name'
                    onChange={inputsHandler}
                    value={values.lastName}
                />
            </TableCell>
            <TableCell className='add_row_input_container' align="left">
                <input
                    className='add_row_input'
                    name='email'
                    type='email'
                    placeholder='email'
                    onChange={inputsHandler}
                    value={values.email}
                />
            </TableCell>
            <TableCell className='add_row_input_container' align="left">
                <input
                    className='add_row_input'
                    name='phone'
                    type='text'
                    placeholder='(999)99-9999'
                    onChange={inputsHandler}
                    value={values.phone}
                />
            </TableCell>
        </TableRow>
    )
};

export default AddRow;