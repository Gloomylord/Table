import React, {useCallback} from "react";
import style from '../style.module.css';
import cn from 'classnames';

type PropsT = {
    align?: "left" | "center" | "right" | "justify" | "char",
    component?: any,
    sortDirection?: string | false,
    handleRequestSort?(value: string): void
    id?: string,
    orderBy?: string,
    order?: 'asc' | 'desc',
    setOrder?(value: 'asc' | 'desc'): void,
    setPage?(value: number): void,
    colSpan?: string,
}

const TableCell: React.FC<PropsT | React.ComponentProps<any>> = ({
                                         children, align, component: Component = 'td', order, id,
                                         handleRequestSort, setOrder, orderBy, setPage, colSpan,className, ...other
                                     } ) => {
    const onClickHandler = useCallback(() => {
        if (handleRequestSort && id) {
            if (orderBy !== id) {
                handleRequestSort(id);
                if (setPage) setPage(0);
            } else {
                if (setOrder) setOrder(order == 'asc' ? 'desc' : 'asc');
                if (setPage) setPage(0);
            }
        }
    }, [id, order, orderBy]);

    return (
        <Component onClick={onClickHandler} align={align} colSpan={colSpan}
                   className={cn(style.cell, className, {[style.sortable]: !!order})}>
            {children}
            {!!order && (
                <span className={cn(style.arrow, {[style.asc]: order == 'asc', [style.chose]: orderBy == id})}>
                    <svg className="MuiSvgIcon-root MuiTableSortLabel-icon MuiTableSortLabel-iconDirectionDesc"
                         focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
                    </svg>
                </span>
            )}
        </Component>
    );

};

export default TableCell;