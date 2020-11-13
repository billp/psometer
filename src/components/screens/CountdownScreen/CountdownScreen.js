import React from 'react'
import { SimpleLayout } from '../../SimpleLayout/SimpleLayout'
import styles from './CountdownScreen.module.css'
import { connect } from 'react-redux'
import { updateCountdownParams, updateConfigurationInitialSetupCompleted } from '../../../actions'
import { withRouter } from "react-router-dom"
import { compose } from 'redux'

class CountdownScreen extends React.Component {
    state = {
        start_date: null,
        end_date: null
    }

    render() {
      return (
          <SimpleLayout>
              yo
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
)(CountdownScreen)