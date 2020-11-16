import React from 'react'
import { SimpleLayout } from '../../../SimpleLayout/SimpleLayout'
import { AnimatedButton } from '../../../AnimatedButton/AnimatedButton'
import styles from './SetParameters.module.css'
import { ReactComponent as TopIcon } from '../../../../images/settings-icon.svg'
import { connect } from 'react-redux'
import { updateCountdownParams, 
         updateConfigurationInitialSetupCompleted, 
         updateName, 
         clearAllSettings,
         validateFields } from '../../../../actions'
import { withRouter } from "react-router-dom"
import { compose } from 'redux'
import PSDatePicker from '../../../PSDatePicker/PSDatePicker'
import { Redirect } from 'react-router-dom'
import { speakName } from '../../../../utils/langUtils'
import Form from '../../../Form/Form'
import TextField from '../../../TextField/TextField'
import _ from 'lodash'
import moment from 'moment'

class SetParameters extends React.Component {
    state = {
        startDate: null,
        endDate: null,
        name: null,
        dirty: false
    }

    render() {
      if (this.props.user.name === undefined) {
        return <Redirect to="/init/step1" />
      }
      return (
          <SimpleLayout>
              <TopIcon className={styles['settings-icon']} width="150px" height="150px" />
              <div class={styles['welcome-text']}>
                { this.props.showAll ?
                   <div className={styles['header']}>Ρυθμίσεις</div> :
                   "Γεια σου "+ speakName(this.props.user.name) + ", θα χρειαστώ κάποιες πληροφορίες για να setάρω το PSΟμετρό σου."  }
              </div>
              <Form className={styles.form}>
                {this.props.showAll ?
                  <TextField
                      name="name" 
                      label="Όνομα"
                      value={this.state.name}
                      onChange={e => this.setState({name: e.target.value})}
                  /> : ''
                }
                <PSDatePicker 
                  value={Date.parse(this.state.startDate)}
                  onChange={date => this.setState({ startDate: date }, () => { 
                    if (!_.isNil(this.state.endDate)) {
                      this.props.validateFields(['end-date'])
                    }
                  })}
                  label="Ημερομηνία έναρξης Production Support"
                  name="start-date" 
                />
                <PSDatePicker 
                  value={Date.parse(this.state.endDate)}
                  onChange={date => this.setState({ endDate: date })}
                  label="Ημερομηνία λήξης Production Support"
                  name="end-date"
                  customValidation={this.validateEndDate.bind(this)}
                />
                { this.props.showAll ? 
                  this.allParamsButtons() : 
                  this.initParamsButtons() }
              </Form>
          </SimpleLayout>
        )
    }

    allParamsButtons() {
      return (
        <div>
          <AnimatedButton 
            className={styles['animated-button-left']}
            onClick={this.removeAllSettings.bind(this)}>Διαγραφή δεδομένων</AnimatedButton>
          <AnimatedButton 
            className={styles['animated-button-right']}
            onClick={this.saveAll.bind(this)}
            isDisabled={!this.isFormValid()}>Αποθήκευση</AnimatedButton>
        </div>
      )
    }

    initParamsButtons() {
      return (
        <div>
          <AnimatedButton 
            className={styles['animated-button-left']}
            onClick={this.goBack.bind(this)}>← Πίσω</AnimatedButton>
          <AnimatedButton 
            className={styles['animated-button-right']}
            onClick={this.saveAll.bind(this)}
            isDisabled={!this.isFormValid()}>Συνέχεια →</AnimatedButton>
        </div>
      )
    }


    validateEndDate(value) {
      const startDate = moment(_.get(this.state, 'startDate', '')).unix()
      const endDate = moment(_.get(this.state, 'endDate', '')).unix()
      const now = moment().unix()

      if (endDate < now) {
        return {
          valid: false,
          error: 'Η ημ/νία λήξης πρέπει να είναι μεγαλύτερη από την σημερινή'
        }
      }

      if (endDate - startDate <= 0) {
        return {
          valid: false,
          error: 'Η ημ/νία λήξης πρέπει να είναι μεγαλύτερη από την ημ/νία έναρξης'
        }
      }

      return {
        valid: true,
        error: null
      }
    }

    goBack(e) {
      e.preventDefault()
      this.props.history.goBack()
    }

    removeAllSettings(e) {
      e.preventDefault()
      if (window.confirm(speakName(this.props.user.name) + ' έισαι σίγουρος/η ότι θέλεις να διαγράψεις όλα τα δεδομένα;')) {
        this.props.clearAllSettings()
      }
    }

    saveAll(e) {
      e.preventDefault()
      this.props.validateFields(['start-date', 'end-date']).then(() => {
        if (this.isFormValid()) {
          this.props.updateCountdownParams(this.state.startDate, this.state.endDate)
          this.props.updateConfigurationInitialSetupCompleted(true)
          this.props.updateName(this.state.name)    
          this.props.history.push("/")
        }
      })
    }

    componentDidMount() {
      this.setState({
        name: this.props.user.name,
        startDate: this.props.parameters.startDate, 
        endDate: this.props.parameters.endDate
      })
    }

    isFormValid() {
      return _.keys(this.props.validationErrors).length === 0 && 
        !_.isNil(this.state.startDate) && 
        !_.isNil(this.state.endDate) && 
        !_.isNil(this.state.name)
    }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    parameters: state.parameters,
    validationErrors: state.validations.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateCountdownParams: (startDate, endDate) => { dispatch(updateCountdownParams(startDate, endDate)) },
    updateConfigurationInitialSetupCompleted: (value) => { dispatch(updateConfigurationInitialSetupCompleted(value)) },
    updateName: (value) => { dispatch(updateName(value)) },
    validateFields: (names, cb) => dispatch(validateFields(names)).then(cb),
    clearAllSettings: () => { dispatch(clearAllSettings()) }
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SetParameters)