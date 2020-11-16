import React from 'react'
import './index.css'
import { connect } from 'react-redux'
import WelcomeScreen from './components/screens/Initial/WelcomeScreen/WelcomeScreen'
import SetParameters from './components/screens/Initial/SetParameters/SetParameters'
import CountdownScreen from './components/screens/CountdownScreen/CountdownScreen'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

class PSOmeter extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/init/step1">
                        <WelcomeScreen />
                    </Route>
                    <Route path="/init/step2">
                        <SetParameters />
                    </Route>
                    <Route path="/settings">
                        <SetParameters showAll={true} />
                    </Route>
                    <Route path="/">
                        {this.props.configuration.initialSetupCompleted ? 
                          <CountdownScreen /> : 
                          <Redirect to="/init/step1" />}
                    </Route>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => {
  return {
    configuration: state.configuration
  }
}

export default connect(mapStateToProps)(PSOmeter)