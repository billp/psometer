import './SimpleLayout.css';
import React from 'react';
import { Logo } from '../Logo/Logo';


export class SimpleLayout extends React.Component {
    render() {
        return (
            <div class="layout-container">
                <div id="header">
                    <div class="logo"><Logo /></div>
                </div>
                <div id="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}