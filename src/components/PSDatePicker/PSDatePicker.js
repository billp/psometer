import React from 'react'
import TextField from '../TextField/TextField'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import styles from './PSDatePicker.module.css'
import { validateFields } from '../../actions'
import { connect } from 'react-redux'

class PSDatePicker extends React.Component {
  state = {
    isFocused: false
  }

  render() {
    return (
      <DatePicker
        selected={this.props.value}
        onChange={this.handleChange.bind(this)}
        dateFormat="dd/MM/yyyy"
        wrapperClassName={styles['date-picker']}
        calendarClassName={styles.calendar}
        onCalendarOpen={this.handleOpen.bind(this)}
        onCalendarClose={this.handleClose.bind(this)}
        name={this.props.name}
        customInput={
          <TextField 
            label={this.props.label}
            value={this.props.value}
            isFocused={this.state.isFocused}
            ph="Επίλεξε μία ημερομηνία"
            validateOnBlur={false}
            requiredValidationMessage={this.props.requiredValidationMessage}
            customValidation={this.props.customValidation}
            isReadOnly
          />
        }
      />
    )
  }

  handleChange(value) {
    this.props.validateFields([this.props.name])
    this.props.onChange(value)
  }

  handleOpen() {
    this.setState({ isFocused: true })
  }

  handleClose() {
    this.setState({ isFocused: false })
  }
}

PSDatePicker.defaultProps = {
  customValidation: () => { return { valid: true, error: null } },
}

const mapDispatchToProps = dispatch => {
  return {
    validateFields: (names) => { dispatch(validateFields(names))}
  }
}

export default connect(null, mapDispatchToProps)(PSDatePicker)