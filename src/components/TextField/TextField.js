import React from 'react'
import './TextField.css'
import { connect } from 'react-redux'
import _ from 'lodash'

class TextField extends React.Component {
    constructor(props) {
      super(props);
      this.textFieldRef = React.createRef();
    }

    state = {
      isFocused: false
    }

    render() {
        return (
          <div>
            <div class="textfield">
                <input type="text" 
                  onChange={this.props.onChange} 
                  name={this.props.name}
                  id={this.props.name}
                  value={this.props.value}
                  onClick={this.props.onClick}
                  onKeyPress={this.handleKeyPress.bind(this)}
                  ref={this.textFieldRef}
                  onBlur={this.handleBlur.bind(this)}
                  placeholder={this.props.ph}
                  autoComplete="off" />
                <label htmlFor={this.props.name} class="label-name">
                    <span class="content-name">{this.props.label}</span>
                </label>
            </div>
            {this.showValidationErrorsIfNeeded()}
          </div>
        )
    }

    handleBlur() {
      if (this.textFieldRef.current && this.props.isFocused) {
        this.textFieldRef.current.focus()
      }
    }

    handleKeyPress(e) {
      if (this.props.isReadOnly) {
        e.preventDefault()
      }
      return true
    }

    showValidationErrorsIfNeeded() {
      const errorMessage = _.get(this.props.validationErrors, this.props.name)
      if (errorMessage) {
        return (
          <div className="error">{errorMessage}</div>
        )
      }
    }
}

const mapStateToProps = state => {
  return {
      validationErrors: state.validationErrors
  }
}

export default connect(mapStateToProps)(TextField)