import './Logo.css';
import React from 'react';
import { ReactComponent as LogoIcon } from '../../images/logo-icon.svg';

export class Logo extends React.Component {
    render() {
        return (
            <div class="container">
                <div class="main">
                    <div class="logo-ps">PS</div>
                    <div class="logo-icon">
                        <LogoIcon width="50px" height="50px" />
                    </div>
                    <div class="logo-meter">μετρο</div>
                </div>
                <div class="small">
                    Production support countdown timer
                </div>
            </div>
        )
    }
}