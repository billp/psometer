import React from 'react'
import { SimpleLayout } from '../../../SimpleLayout/SimpleLayout'
import { AnimatedButton } from '../../../AnimatedButton/AnimatedButton'
import styles from './SetParameters.module.css'
import { ReactComponent as TopIcon } from '../../../../images/settings-icon.svg'
import { connect } from 'react-redux'
import { updateCountdownParams, 
         updateConfigurationInitialSetupCompleted, 
         updateName, 
         clearAllSettings } from '../../../../actions'
import { withRouter } from "react-router-dom"
import { compose } from 'redux'
import { PSDatePicker } from '../../../PSDatePicker/PSDatePicker'
import { Redirect } from 'react-router-dom'
import { speakName } from '../../../../utils/langUtils'
import TextField from '../../../TextField/TextField'

class SetParameters extends React.Component {
    state = {
        start_date: null,
        end_date: null,
        name: null
    }
    
    render() {
      if (this.props.user.name == undefined) {
        return <Redirect to="/init/step1" />
      }
      return (
          <SimpleLayout>
              <TopIcon className={styles['settings-icon']} width="150px" height="150px" />
              <div class={styles['welcome-text']}>
                { this.props.showAll ?
                   <div className={styles['header']}>Ρυθμίσεις</div> :
                   "Γεια σου "+ speakName(this.props.user.name) + ", θα χρειαστώ κάποιες πληροφορίες για να setάρω το PSΌμετρό σου."  }
              </div>
              <form className={styles.form}>
                {this.props.showAll ?
                  <TextField
                      name="name" 
                      label="Όνομα"
                      value={this.state.name}
                      onChange={e => this.setState({name: e.target.value})}
                  /> : ''
                }
                <PSDatePicker 
                  value={Date.parse(this.state.start_date)}
                  onChange={date => this.setState({ start_date: date })}
                  label="Ημερομηνία έναρξης Production Support"
                  name="start-date" 
                />
                <PSDatePicker 
                  value={Date.parse(this.state.end_date)}
                  onChange={date => this.setState({ end_date: date })}
                  label="Ημερομηνία λήξης Production Support"
                  name="end-date" 
                />
                { this.props.showAll ? 
                  this.allParamsButtons() : 
                  this.initParamsButtons() }
              </form>
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
            onClick={this.saveAll.bind(this)}>Αποθήκευση</AnimatedButton>
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
            onClick={this.saveAll.bind(this)}>Συνέχεια →</AnimatedButton>
        </div>
      )
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
      this.props.updateCountdownParams(this.state.start_date, this.state.end_date)
      this.props.updateConfigurationInitialSetupCompleted(true)
      this.props.updateName(this.state.name)
      this.props.history.push("/");
    }

    componentDidMount() {
      this.setState({
        name: this.props.user.name,
        start_date: this.props.parameters.start_date, 
        end_date: this.props.parameters.end_date
      })
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        parameters: state.parameters
    }
}
 
const mapDispatchToProps = dispatch => {
  return {
    updateCountdownParams: (start_date, end_date) => { dispatch(updateCountdownParams(start_date, end_date)) },
    updateConfigurationInitialSetupCompleted: (value) => { dispatch(updateConfigurationInitialSetupCompleted(value)) },
    updateName: (value) => { dispatch(updateName(value)) },
    clearAllSettings: () => { dispatch(clearAllSettings()) }
  }
}
  
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SetParameters)