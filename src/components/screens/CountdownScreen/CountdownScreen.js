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
        start_date: null,
        end_date: null
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

    settingsAction(e) {
      e.preventDefault()
      this.props.history.push("/settings");
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
)(CountdownScreen)