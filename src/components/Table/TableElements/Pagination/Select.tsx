import React, {useCallback, useState, useEffect, useRef} from 'react';
import cn from 'classnames';
import style from './Select.module.css';

type PropsT = {
    options: number[],
    option: number,
    onChange(value: number): void,
};


export const Select: React.FC<PropsT> = ({options, option, onChange}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const selectRef = useRef<any>();

    const onClickSelect = useCallback(() => {
        setVisible(!visible);
    }, [visible]);

    useEffect(() => {
        const handler = ({target}: any) => {
            if (target.closest(`.${style.select}`) !== selectRef.current) {
                setVisible(false);
            }
        };

        document.documentElement.addEventListener('click', handler);

        return () => {
            document.documentElement.removeEventListener('click', handler);
        };
    }, [style.select]);

    const onClickSelectValue = useCallback((event: any) => {
        setVisible(false);
        onChange(+event.target.textContent);
    }, [visible]);

    return (
        <div className={style.select} ref={selectRef} role="listbox">
            <div>{option}</div>

            <div>
                <svg className="MuiSvgIcon-root MuiSelect-icon MuiTablePagination-selectIcon" focusable="false"
                     viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 10l5 5 5-5z"/>
                </svg>
            </div>

            <input type='button' onClick={onClickSelect} value={option} className={style.selectValue}/>

            <div className={cn(style.values, {[style.hidden]: !visible})}>
                {options.map((value) => <div role="option" onClick={onClickSelectValue} key={value}>{value}</div>)}
            </div>
        </div>
    );
};
