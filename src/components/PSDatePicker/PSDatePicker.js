import React from 'react'
import { TextField } from '../TextField/TextField'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import styles from './PSDatePicker.module.css'

export class PSDatePicker extends React.Component {
  state = {
    isFocused: false
  }

  render() {
    return (
      <DatePicker
        selected={this.props.value}
        onChange={this.props.onChange}
        wrapperClassName={styles['date-picker']}
        calendarClassName={styles.calendar}
        onCalendarOpen={this.handleOpen.bind(this)}
        onCalendarClose={this.handleClose.bind(this)}
        customInput={
        <TextField 
          name={this.props.name}
          label={this.props.label}
          value={this.props.value}
          isFocused={this.state.isFocused}
          ph="Επίλεξε μία ημερομηνία"
          isReadOnly
        />}
      />
    )
  }

  handleOpen() {
    this.setState({ isFocused: true })
  }

  handleClose() {
    this.setState({ isFocused: false })
  }
}
