import React from "react";
import style from '../style.module.css';

const TableFoot: React.FC = ({children}) => (
    <tfoot className={style.tfoot}>
        {children}
    </tfoot>
);

export default TableFoot;
