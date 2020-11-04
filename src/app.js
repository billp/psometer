import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { WelcomeScreen } from './components/screens/WelcomeScreen/WelcomeScreen';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
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
                </Switch>
            </Router>
        );
    }
}

export default PSOmeter;