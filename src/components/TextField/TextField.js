import React from 'react';
import './TextField.css';

export class TextField extends React.Component {
    render() {
        return (
            <div class="textfield">
                <input type="text" name={this.props.name} autocomplete="off" required />
                <label for={this.props.name} class="label-name">
                    <span class="content-name">{this.props.label}</span>
                </label>
            </div>
        )
    }
} 