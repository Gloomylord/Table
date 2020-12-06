import React, {useCallback} from "react";
import TableRow from "../Table/TableElements/TableRow";

const TableRowDecorator: React.FC<React.ComponentProps<any>> = ({link, selectRow, children, ...other}) => {
    const onClick = useCallback(() => {
        selectRow(link);
    }, [selectRow, link]);

    return (
        <TableRow {...other} onClick={onClick}>
            {children}
        </TableRow>
    );
};

export default TableRowDecorator;
