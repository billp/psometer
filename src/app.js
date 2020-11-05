import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { connect } from 'react-redux';
import WelcomeScreen from './components/screens/WelcomeScreen/WelcomeScreen';
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
                        <WelcomeScreen />
                    </Route>
                    <Route path="/">
                        {this.props.configuration.initialSetupCompleted ? 
                          <Redirect to="/dashboard" /> : 
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