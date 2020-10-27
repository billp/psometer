import * as React from "react";
import './AnimatedButton.scss'

export class AnimatedButton extends React.Component {
    render() {
        return (
            <span className="initial-next-button-wrapper" onClick={this.props.onClick}>
                <button>{this.props.children}</button>
                <span className="initial-next-button-bg1"/>
                <span className="initial-next-button-bg2"/>
            </span>
        )
    }
}
