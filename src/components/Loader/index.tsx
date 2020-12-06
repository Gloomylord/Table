import React from "react";
import styles from './styles.module.css';

const Loader: React.FC = () => (
    <div className={styles.container}>
        <div className={styles.loader}>
            {Array.from({length: 10}).map((_, i) => (
                <div key={i} className={styles.element} style={{'--i': i} as React.CSSProperties}/>
            ))}
        </div>
    </div>
);


export default Loader;
