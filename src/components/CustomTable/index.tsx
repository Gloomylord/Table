import React, {useCallback, useState, ChangeEvent} from 'react';
import {nanoid} from "nanoid";
import {stableSort, getComparator} from "./functions/sort";
import Table from "../Table";
import TableCaption from "../Table/TableElements/TableCaption";
import TableHead from "../Table/TableElements/TableHead";
import TableRow from "../Table/TableElements/TableRow";
import TableCell from "../Table/TableElements/TableCell";
import TableBody from "../Table/TableElements/TableBody";
import TableContainer from "../Table/TableElements/TableContainer";
import TablePagination from "../Table/TableElements/Pagination/TablePagination";
import TableRowDecorator from "./TableRowDecorator";
import AddRow from "./AddRow";
import {searchFilter} from "./functions/searchFilter";
import AdditionalInformation from "./AdditionalInformation";

interface Address {
    city: string,
    state: string,
    streetAddress: string,
    zip: string
}

export interface Data {
    firstName: string;
    lastName: string;
    id: number;
    phone: string;
    email: number;
    address?: Address;
    keyId: string;
    description?: string
}

type Order = 'asc' | 'desc';

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    align?: "left" | "center" | "right" | "justify" | "char",
}

const headCells: HeadCell[] = [
    {id: 'id', align: 'left', disablePadding: true, label: 'id'},
    {id: 'firstName', align: 'left', disablePadding: false, label: 'FirstName'},
    {id: 'lastName', align: 'left', disablePadding: false, label: 'LastName'},
    {id: 'email', align: 'left', disablePadding: false, label: 'Email'},
    {id: 'phone', align: 'left', disablePadding: false, label: 'Phone'},
];

interface IProps {
    rows: [Data],
    addElement(el: Data): void
}

const defaultNewRow = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
};

const CustomTable: React.FC<IProps> = ({rows, addElement}) => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data | ''>('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(50);
    const [selectedRow, setSelectedRow] = useState<Data>();
    const [sortedRows, setSortedRows] = useState<any>(rows);
    const [value, setValue] = useState<string>('');
    const [addRow, setAddRow] = useState<boolean>(false);
    const [newRow, setNewRow] = useState<any>(defaultNewRow);
    const [canAdd, setCanAdd] = useState<boolean>(false);

    const handleRequestSort = useCallback((property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, [orderBy, order]);

    const handleChangePage = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((value: number) => {
        setRowsPerPage(value);
        setPage(0);
    }, []);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    }, []);

    const toggleAddRow = useCallback(() => {
        setAddRow(!addRow);
    }, [addRow]);

    const addRowInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let values = {...newRow};
        values[e.target.name] = e.target.value;
        setNewRow(values);
        if (Object.values(values).filter(value => value === '').length > 0) {
            setCanAdd(false);
        } else {
            setCanAdd(true);
        }
    }, [newRow]);

    const addRowHandler = useCallback(() => {
        let row = {...newRow, keyId: nanoid()};
        addElement(row);
        setSortedRows([row, ...rows]);
        //@ts-ignore
        setSelectedRow(row);
        setOrder('asc');
        setOrderBy('');
        setPage(0);
        setAddRow(false);
        setNewRow(defaultNewRow);
        setCanAdd(false);
    }, [newRow]);

    const search = useCallback((e) => {
        e.preventDefault();
        setSortedRows(searchFilter(rows, value));
        setPage(0);
    }, [value]);

    return (
        <div>
            <TableCaption>Моя Кастомная таблица</TableCaption>
            <div className='table_menu'>
                <form className='table_search' onSubmit={search}>
                    <input onChange={onChange} className='search_input'/>
                    <button className='search_button'>Найти</button>
                </form>
                <div className='table_menu__add'>
                    <button className='search_button' onClick={toggleAddRow}>
                        {!addRow ? 'Добавить' : 'Отменить'}
                    </button>
                    {addRow &&
                    <button
                        onClick={addRowHandler}
                        disabled={!canAdd}
                        className='search_button'>
                        Добавить в таблицу
                    </button>
                    }
                </div>
            </div>
            <TableContainer>
                <Table aria-label="table">
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell
                                    component="th"
                                    key={headCell.id}
                                    align={headCell.align}
                                    setOrder={setOrder}
                                    order={order}
                                    orderBy={orderBy}
                                    id={headCell.id}
                                    setPage={setPage}
                                    handleRequestSort={handleRequestSort}>
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {addRow && <AddRow values={newRow} inputsHandler={addRowInputHandler}/>}
                        {sortedRows.length > 0 && orderBy !== '' ?
                            stableSort(sortedRows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                                .map((row) => (
                                    <TableRowDecorator
                                        key={row.keyId}
                                        link={row}
                                        selectRow={setSelectedRow}
                                        className={(row.keyId == selectedRow?.keyId) ? 'selected' : ''}
                                    >
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell align="left">{row.firstName}</TableCell>
                                        <TableCell align="left">{row.lastName}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.phone}</TableCell>
                                    </TableRowDecorator>
                                ))
                            : (
                                sortedRows.length > 0 ?
                                    <>{
                                        sortedRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                                            .map((row: any) => (
                                                <TableRowDecorator
                                                    key={row.keyId}
                                                    link={row}
                                                    selectRow={setSelectedRow}
                                                    className={(row.keyId == selectedRow?.keyId) ? 'selected' : ''}
                                                >
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell align="left">{row.firstName}</TableCell>
                                                    <TableCell align="left">{row.lastName}</TableCell>
                                                    <TableCell align="left">{row.email}</TableCell>
                                                    <TableCell align="left">{row.phone}</TableCell>
                                                </TableRowDecorator>
                                            ))
                                    }</>
                                    :
                                    <TableRow>
                                        <TableCell align="left" colSpan="5">Пусто</TableCell>
                                    </TableRow>
                            )}
                    </TableBody>
                </Table>
                <TablePagination page={page}
                                 rowsPerPage={rowsPerPage}
                                 count={sortedRows.length}
                                 onChangeRowsPerPage={handleChangeRowsPerPage}
                                 onChangePage={handleChangePage}
                                 rowsPerPageOptions={[10, 20, 50]}/>
            </TableContainer>
            {selectedRow && (
                <AdditionalInformation selectedRow={selectedRow}/>
            )}
        </div>
    );
};

export default CustomTable;
