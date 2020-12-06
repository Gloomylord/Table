import React from "react";
import cn from 'classnames';
import style from '../style.module.css';

const TableRow: React.FC<React.ComponentProps<any>> = ({children, className, ...other}) => (
    <tr className={cn(style.tr, className)} {...other}>
        {children}
    </tr>
);

export default TableRow;