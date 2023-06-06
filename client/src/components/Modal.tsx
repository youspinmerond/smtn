import React from "react";
import styles from "../styles/modal.module.sass";

export default function Modal({children, setState}: {children: React.ReactNode, setState?: any}) {
    const onClick = () => {
        setState({
            show: false,
            content: ""
        })
    }
    return (
        <div className={styles.modal} onClick={onClick}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                {
                    children
                }
            </div>
        </div>
    );
}