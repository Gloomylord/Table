import React from "react";
import style from '../style.module.css';

const TableBody: React.FC = ({children}) => (
    <tbody className={style.tbody}>
        {children}
    </tbody>
);

export default TableBody;
