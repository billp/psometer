import React from 'react'
import './TextField.css'
import { connect } from 'react-redux'
import _ from 'lodash'
import { 
  setValidationError, 
  clearValidationError 
} from '../../actions'

class TextField extends React.Component {
  state = {
    isFocused: false,
  }

  constructor(props) {
    super(props);
    this.textFieldRef = React.createRef();
  }

  componentDidMount() {
    this.props.clearValidationError(this.props.name)
  }

  componentDidUpdate(prevProps) {
    if (_.indexOf(this.props.validateFields, this.props.name) !== -1) {
      this.validate(this.props.value)
    }
  }

  render() {
    return (
      <div>
        <div class="textfield">
            <input type="text" 
              onChange={this.handleOnChange.bind(this)} 
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
                <span class="content-name">{this.props.label} { this.props.isRequired ? '*' : '' }</span>
            </label>
        </div>
        {this.showValidationErrorsIfNeeded()}
      </div>
    )
  }

  handleBlur(e) {
    if (this.props.onBlur !== undefined) {
      this.props.onBlur()
    } 
    
    if (this.textFieldRef.current && this.props.isFocused) {
      this.textFieldRef.current.focus()
    }

    if (this.props.validateOnBlur === true) {
      this.validate(e.target.value)
    }
  }

  handleOnChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e)
    }
    this.setState({ value: this.props.value }, () => {
      if (e.target.value.length > 0) {
        this.validate(e.target.value) 
      }
    })
  }

  validate(value) {
    if (this.props.name === undefined) {
      return
    }

    const customValidationResult = this.props.customValidation(value)

    let fieldValid = true
    if (this.props.isRequired && _.size(value) === 0) {
      this.props.setValidationError(this.props.name, this.props.requiredValidationMessage)
      fieldValid = false
    } else if (!customValidationResult.valid) {
      this.props.setValidationError(this.props.name, customValidationResult.error)
      fieldValid = false
    } else {
      this.props.clearValidationError(this.props.name)
    }

    this.setState({ fieldValid })
    return fieldValid
  }

  handleKeyPress(e) {
    if (this.props.isReadOnly) {
      e.preventDefault()
    }
    return true
  }

  showValidationErrorsIfNeeded() {
    if (!this.isFieldValid()) {
      return (
        <div className="error">{this.validationErrorMessage()}</div>
      )
    }
  }

  validationErrorMessage() {
    return _.get(this.props.validationErrors, this.props.name)
  }

  isFieldValid() {
    return this.validationErrorMessage() === undefined
  }
}

const mapStateToProps = state => {
  return {
      validationErrors: state.validations.errors,
      validateFields: state.validations.validateFields
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setValidationError: (name, error) => { dispatch(setValidationError(name, error)) },
    clearValidationError: (name) => { dispatch(clearValidationError(name)) }
  }
}

TextField.defaultProps = {
  validateOnBlur: true,
  isRequired: true,
  requiredValidationMessage: 'Αυτό το πεδίο είναι υποχρεωτικό',
  customValidation: () => { return { valid: true, error: null } }
};


export default connect(mapStateToProps, mapDispatchToProps)(TextField)