import React from 'react';
import { ReactComponent as LogoIcon } from '../../images/logo-icon.svg';
import styles from './Logo.module.css';

export class Logo extends React.Component {
    render() {
        return (
            <div class={styles.container}>
                <div class={styles.main}>
                    <div class={styles.ps}>PS</div>
                    <div class={styles.icon}>
                        <LogoIcon width="50px" height="50px" />
                    </div>
                    <div class={styles.meter}>μετρο</div>
                </div>
                <div class={styles.small}>
                    Production support countdown timer
                </div>
            </div>
        )
    }
}