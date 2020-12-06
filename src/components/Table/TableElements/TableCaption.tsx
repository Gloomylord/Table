import React from "react";
import style from '../style.module.css';

const TableCaption: React.FC = (props) => (
    <h1 className={style.caption}>
        {props.children}
    </h1>
);

export default TableCaption;
