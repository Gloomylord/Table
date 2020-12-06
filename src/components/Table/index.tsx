import React from "react";
import style from './style.module.css';
import cn from 'classnames';

const Table: React.FC<React.ComponentProps<any>> = ({children, classNames, ...other},) => (
    <table className={cn(style.table, classNames)} {...other}>
        {children}
    </table>
);

export default Table;
