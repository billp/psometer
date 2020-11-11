import React from 'react';
import './TextField.css';

export class TextField extends React.Component {
    render() {
        return (
            <div class="textfield">
                <input type="text" 
                  onChange={this.props.onChange} 
                  name={this.props.name} 
                  value={this.props.value}
                  onClick={this.props.onClick}
                  autoComplete="off" required />
                <label htmlFor={this.props.name} class="label-name">
                    <span class="content-name">{this.props.label}</span>
                </label>
            </div>
        )
    }
} 