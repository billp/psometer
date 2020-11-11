import React from 'react';
import './TextField.css';

export class TextField extends React.Component {
    constructor(props) {
      super(props);
      this.textFieldRef = React.createRef();
    }

    state = {
      isFocused: false
    }

    render() {
        return (
            <div class="textfield">
                <input type="text" 
                  onChange={this.props.onChange} 
                  name={this.props.name} 
                  value={this.props.value}
                  onClick={this.props.onClick}
                  readOnly={this.props.isReadOnly}
                  ref={this.textFieldRef}
                  onBlur={this.handleBlur.bind(this)}
                  placeholder={this.props.ph}
                  autoComplete="off" required />
                <label htmlFor={this.props.name} class="label-name">
                    <span class="content-name">{this.props.label}</span>
                </label>
            </div>
        )
    }

    handleBlur() {
      if (this.textFieldRef.current && this.props.isFocused) {
        this.textFieldRef.current.focus()
      }
    }
} 