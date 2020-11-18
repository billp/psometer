import React from 'react'
import { SimpleLayout } from '../../SimpleLayout/SimpleLayout'
import styles from './CountdownScreen.module.css'
import { connect } from 'react-redux'
import { updateCountdownParams, updateConfigurationInitialSetupCompleted } from '../../../actions'
import { withRouter } from "react-router-dom"
import { compose } from 'redux'
import { ReactComponent as SettingsIcon } from '../../../images/settings-icon.svg'
import { ReactComponent as DownArrow } from '../../../images/down-arrow.svg'
import { CountdownView } from '../../../components/CountdownView/CountdownView'
import { ProgressView } from '../../../components/ProgressView/ProgressView'
import moment from 'moment'
import _ from 'lodash'
import { speakName } from '../../../utils/langUtils'
import { allStatuses } from './CountdownStatuses'
import html2canvas from 'html2canvas';

class CountdownScreen extends React.Component {
  state = {
    progress: 0
  }

  constructor(props) {
    super(props)

    this.main = React.createRef()
  }
  
  render() {
    return (
        <SimpleLayout>
          <div className={styles['menu-bar']}>
            <ul>
              <li>
                <a href="#capture" onClick={this.captureAction.bind(this)}>
                  <DownArrow width="20px" height="20px" className={styles['down-icon']} />
                </a>
              </li>
              <li>
                <a href="#settings" onClick={this.settingsAction.bind(this)}>
                  <SettingsIcon width="30px" height="30px" className={styles['settings-icon']} />
                </a>
              </li>
            </ul>
          </div>
          <div ref={this.main} 
            id="cd-main"
            className={styles['main']}>
            <div className={styles['avatar']}>
              {this.currentStatus('icon', 100)}
              <div className={styles['status']}>
                {this.currentStatus('status')}
              </div>
            </div>
            <div className={styles['status-description']}>
              {this.currentStatus('text')}
            </div>
            <div className={styles['progress-view']}>
              <ProgressView
                minValue={0} 
                maxValue={1}
                currentValue={this.state.progress}
                valueFormatter={(val) => parseInt(val*100) + '%'}
                />
            </div>
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

  captureAction(e) {
    e.preventDefault()
    html2canvas(this.main.current, { 
      backgroundColor: "#005F40", 
      scale: 0.8
    }).then(((canvas) => {
      canvas.toBlob((blob) => {
        let link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', `progress.${this.state.progress}.png`);
        link.click();
      },'image/png')
    }))
  }

  currentStatus(key) {
    return _.chain(allStatuses(speakName(this.props.user.name), 130))
      .takeRightWhile(o => { return this.state.progress < o.maxProgress })
      .head()
      .get(key)
      .value()
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