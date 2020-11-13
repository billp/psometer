import React from 'react'
import { SimpleLayout } from '../../../SimpleLayout/SimpleLayout'
import { AnimatedButton } from '../../../AnimatedButton/AnimatedButton'
import styles from './SetParameters.module.css'
import { ReactComponent as TopIcon } from '../../../../images/settings-icon.svg'
import { connect } from 'react-redux'
import { updateCountdownParams, updateConfigurationInitialSetupCompleted } from '../../../../actions'
import { withRouter } from "react-router-dom"
import { compose } from 'redux'
import { PSDatePicker } from '../../../PSDatePicker/PSDatePicker'
import { Redirect } from 'react-router-dom'
import { convertName } from '../../../../utils/langUtils'

class SetParameters extends React.Component {
    state = {
        start_date: null,
        end_date: null
    }

    render() {
      if (this.props.user.name == undefined) {
        return <Redirect to="/init/step1" />
      }
      return (
          <SimpleLayout>
              <TopIcon class={styles['settings-icon']} width="150px" height="150px" />
              <div class={styles['welcome-text']}>Γεια σου {convertName(this.state.name)}, θα χρειαστώ κάποιες πληροφορίες για να setάρω το PSΌμετρό σου.</div>
              <form className={styles.form} onSubmit={this.handleSubmit.bind(this)}>
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
                <div>
                  <AnimatedButton 
                    className={styles['animated-button-left']}
                    onClick={this.props.history.goBack}>← Πίσω</AnimatedButton>
                  <AnimatedButton 
                    className={styles['animated-button-right']}>Συνέχεια →</AnimatedButton>
                </div>
              </form>
          </SimpleLayout>
        )
    }

    componentDidMount() {
      this.setState({
        name: this.props.user.name,
        start_date: this.props.parameters.start_date, 
        end_date: this.props.parameters.end_date
      })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.updateCountdownParams(this.state.start_date, this.state.end_date)
        this.props.updateConfigurationInitialSetupCompleted(true)
        this.props.history.push("/");
    }
}

const mapStateToProps = state => {
  console.log(state)
    return {
        user: state.user,
        parameters: state.parameters
    }
}
 
const mapDispatchToProps = dispatch => {
  return {
    updateCountdownParams: (start_date, end_date) => { dispatch(updateCountdownParams(start_date, end_date)) },
    updateConfigurationInitialSetupCompleted: (value) => { dispatch(updateConfigurationInitialSetupCompleted(value)) }
  }
}
  
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SetParameters)