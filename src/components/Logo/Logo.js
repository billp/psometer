import React from 'react';
import { ReactComponent as LogoIcon } from '../../images/logo-icon.svg';
import styles from './Logo.module.css';

export class Logo extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.ps}>PS</div>
                    <div className={styles.icon}>
                        <LogoIcon width="50px" height="50px" />
                    </div>
                    <div className={styles.meter}>μετρο</div>
                </div>
                <div className={styles.small}>
                    Production support countdown timer
                </div>
            </div>
        )
    }
}