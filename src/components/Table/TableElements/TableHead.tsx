import React from "react";
import style from '../style.module.css';


const TableHead: React.FC<React.ComponentProps<any>> = ({children}) => (
    <thead className={style.thead}>
        {children}
    </thead>
);

export default TableHead;
