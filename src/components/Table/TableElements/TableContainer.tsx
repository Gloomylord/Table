import React from "react";
import style from '../style.module.css';
import cn from 'classnames';

const TableContainer: React.FC<React.ComponentProps<any>> = ({children,className}) => (
    <div className={cn(style.container, className)}>
        {children}
    </div>
);

export default TableContainer;
