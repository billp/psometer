import './SimpleLayout.css';
import React from 'react';
import { Logo } from '../Logo/Logo';

export class SimpleLayout extends React.Component {
    render() {
        return (
            <div class="layout-container">
                <div id="header">
                    <Logo />
                </div>
                <div id="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}