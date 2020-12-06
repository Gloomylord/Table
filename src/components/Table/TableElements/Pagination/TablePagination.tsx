import React, {useCallback, useMemo} from "react";
import style from './TablePagination.module.css';
import {Select} from "./Select";

type PropsT = {
    rowsPerPageOptions: number[],
    count: number,
    rowsPerPage: number,
    page: number,
    onChangePage(newPage: number): void,
    onChangeRowsPerPage(value: number): void,
}

const TablePagination: React.FC<PropsT> = ({
                                               rowsPerPageOptions,
                                               count,
                                               rowsPerPage,
                                               onChangeRowsPerPage,
                                               page,
                                               onChangePage
                                           }) => {
    const onClickLeft = useCallback(() => {
        onChangePage(page - 1);
    }, [page]);

    const onClickRight = useCallback(() => {
        onChangePage(page + 1);
    }, [page]);

    const goToPage = useCallback((page: number) => {
        onChangePage(page - 1);
    }, []);

    const pageNumbers = useMemo(() => (
        Array.from({length: Math.ceil(count / rowsPerPage)}).map((value, i) => i + 1)
    ), [rowsPerPage]);

    return (
        <div className={style.pagination}>
            <div>Строк на странице:&nbsp;</div>
            <div>
                {(((page + 1) * rowsPerPage) <= count) ?
                    ' ' + (page * rowsPerPage + 1) + '-' + ((page + 1) * rowsPerPage)
                    : ' ' + (page * rowsPerPage + 1) + '-' + count}
                &nbsp;из {count}
            </div>

            <Select option={rowsPerPage} options={rowsPerPageOptions} onChange={onChangeRowsPerPage}/>

            {Math.floor(count / rowsPerPage) > 0 && (
                <>
                    <button disabled={page === 0} onClick={onClickLeft}>
                        <span>
                            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                            </svg>
                        </span>
                    </button>
                    <Select option={page + 1} options={pageNumbers} onChange={goToPage}/>
                    <button disabled={(page + 1 === Math.ceil(count / rowsPerPage))} onClick={onClickRight}>
                        <span>
                            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                            </svg>
                        </span>
                    </button>
                </>
            )}
        </div>
    );
};

export default TablePagination;
