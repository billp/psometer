import React from 'react'
import { SimpleLayout } from '../../../SimpleLayout/SimpleLayout'
import { TextField } from '../../../TextField/TextField'
import { AnimatedButton } from '../../../AnimatedButton/AnimatedButton'
import styles from './SetParameters.module.css'
import { ReactComponent as TopIcon } from '../../../../images/settings-icon.svg'
import { connect } from 'react-redux'
import { updateName } from '../../../../actions'
import { withRouter } from "react-router-dom"
import { compose } from 'redux';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

class SetParameters extends React.Component {
    state = {
        start_date: null,
        end_date: null
    }

    

    render() {
        return (
            <SimpleLayout>
                <TopIcon class={styles['settings-icon']} width="150px" height="150px" />
                <div class={styles['welcome-text']}>Γεια σου {this.state.name}, θα χρειαστώ κάποιες πληροφορίες για να setάρω το PSΌμετρό σου.</div>
                <form className={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                  <DatePicker
                    selected={this.state.start_date}
                    onChange={date => this.setState({ start_date: date })}
                    wrapperClassName={styles['date-picker']}
                    calendarClassName={styles.calendar}
                    customInput={
                    <TextField 
                      name="start-date" 
                      label="Ημερομηνία έναρξης Production Support"
                      value={this.state.start_date}
                      onChange={e => this.setState({start_date: e.target.value})}  
                    />}
                  />
                    <DatePicker
                    selected={this.state.end_date}
                    onChange={date => this.setState({ end_date: date })}
                    wrapperClassName={styles['date-picker']}
                    calendarClassName={styles.calendar}
                    customInput={
                      <TextField
                          name="end-date" 
                          label="Ημερομηνία λήξης Production Support"
                          value={this.state.end_date}
                          onChange={e => this.setState({end_date: e.target.value})}
                      />
                      }
                    />
                    <div>
                      <AnimatedButton 
                        className={styles['animated-button-left']}
                        onClick={this.props.history.goBack}>← Πίσω</AnimatedButton>
                      <AnimatedButton className={styles['animated-button-right']}>Συνέχεια →</AnimatedButton>
                    </div>

                </form>
            </SimpleLayout>
        )
    }

    componentDidMount() {
      this.setState({
        name: this.props.user.name
      })
    }

    handleSubmit(e) {
        e.preventDefault()
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
 
// const mapDispatchToProps = dispatch => {
//   return {
//     updateName: name => { dispatch(updateName(name)) }
//   }
// }
  
export default compose(
  withRouter,
  connect(mapStateToProps)
)(SetParameters)