import React from 'react'
import { SimpleLayout } from '../../SimpleLayout/SimpleLayout'
import styles from './CountdownScreen.module.css'
import { connect } from 'react-redux'
import { updateCountdownParams, updateConfigurationInitialSetupCompleted } from '../../../actions'
import { withRouter } from "react-router-dom"
import { compose } from 'redux'
import { ReactComponent as SettingsIcon } from '../../../images/settings-icon.svg'

class CountdownScreen extends React.Component {
    state = {
        startDate: null,
        endDate: null
    }

    render() {
      return (
          <SimpleLayout>
              <div className={styles['menu-bar']}>
                <a href="#" onClick={this.settingsAction.bind(this)}>
                  <SettingsIcon width="30px" height="30px" className={styles['settings-icon']} />
                </a>
              </div>
              <div className={styles['main']}>
                {this.props.user.name}
              </div>
          </SimpleLayout>
        )
    }

    componentDidMount() {
      this.setState({
        name: this.props.user.name,
        startDate: this.props.parameters.startDate, 
        endDate: this.props.parameters.endDate
      })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.updateCountdownParams(this.state.startDate, this.state.endDate)
        this.props.updateConfigurationInitialSetupCompleted(true)
        this.props.history.push("/");
    }

    settingsAction(e) {
      e.preventDefault()
      this.props.history.push("/settings");
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
    updateCountdownParams: (startDate, endDate) => { dispatch(updateCountdownParams(startDate, endDate)) },
    updateConfigurationInitialSetupCompleted: (value) => { dispatch(updateConfigurationInitialSetupCompleted(value)) }
  }
}
  
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(CountdownScreen)