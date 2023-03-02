import styles from '@/styles/Card.module.css';
import { ReactNode } from "react";

export default function Card({ children, ...props }: {
    children: ReactNode | ReactNode[]
}) {
    return (
        <div className={styles.Card} {...props}>
            {children}
        </div>
    )
}