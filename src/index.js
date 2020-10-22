import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { WelcomeScreen } from './components/screens/WelcomeScreen/WelcomeScreen';

class PSOmeter extends React.Component {
    render() {
        return (
            <WelcomeScreen />
        );
    }
}
  
ReactDOM.render(
    <PSOmeter />,
    document.getElementById('root')
);