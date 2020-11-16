import React, { useRef } from 'react'
import { SimpleLayout } from '../../SimpleLayout/SimpleLayout'
import styles from './CountdownScreen.module.css'
import { connect } from 'react-redux'
import { updateCountdownParams, updateConfigurationInitialSetupCompleted } from '../../../actions'
import { withRouter } from "react-router-dom"
import { compose } from 'redux'
import { ReactComponent as SettingsIcon } from '../../../images/settings-icon.svg'
import { CountdownView } from '../../../components/CountdownView/CountdownView'
import { ProgressView } from '../../../components/ProgressView/ProgressView'
import moment from 'moment'

class CountdownScreen extends React.Component {
  state = {
    progress: 0
  }

  render() {
    return (
        <SimpleLayout>
            <div className={styles['menu-bar']}>
              <a href="#settings" onClick={this.settingsAction.bind(this)}>
                <SettingsIcon width="30px" height="30px" className={styles['settings-icon']} />
              </a>
            </div>
            <div className={styles['main']}>
              <ProgressView
                className={styles['progress-view']}
                minValue={0} 
                maxValue={1}
                currentValue={this.state.progress}
                valueFormatter={(val) => parseInt(val*100) + '%'}
               />
              <CountdownView 
                className={styles['countdown-view']}
                start={moment(this.props.parameters.startDate).unix()} 
                end={moment(this.props.parameters.endDate).unix()} 
                progressUpdate={ progress => this.setState({ progress }) }/>
            </div>
        </SimpleLayout>
      )
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