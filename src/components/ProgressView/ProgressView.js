import * as React from "react";
import './ProgressView.scss'
import ReactDOM from 'react-dom';

export class ProgressView extends React.Component {

    constructor(props) {
        super(props);

        const progress = 100 * (props.currentValue - props.minValue) / (props.maxValue - props.minValue);

        const defaultValueFormatter = (progress) => progress + '%';
        const valueFormatter = typeof (props.valueFormatter) === 'function' ? props.valueFormatter
            : defaultValueFormatter;

        this.state = {
            progress: progress,
            width: progress + '%',
            left: progress + '%',
            valueFormatter: valueFormatter
        };

        // Helper value to keep the step of the label
        this.oldProgressStepLabelValue = 0
    }

    /**
     * Calbrate label position based on it's width
     */
    calibrateLabelPosition(label) {
        // Padding from right for the label, value in px
        const LABEL_PADDING_RIGHT = 10;

        const left = label.offsetLeft - label.parentElement.offsetLeft - label.offsetWidth - LABEL_PADDING_RIGHT;
        label.style.left = (left < 0 ? 0 : left) + 'px';
    }

    loopAnimation(currentProgress, progressView, label) {
        // Min and max interval will create a slow down effect
        const MIN_INTERVAL = 10;
        const MAX_INTERVAL = 40;

        // Progress step for each loop
        const STEP = 0.53;
        // How frequent the should update the label
        const UPDATE_LABEL_STEP = 1.5;

        // Check if we need to finish the loop
        if (currentProgress >= this.state.progress) {
            label.innerText = this.props.valueFormatter(this.state.progress);
            return;
        }

        progressView.style.width = currentProgress + '%';
        label.style.left = currentProgress + '%';

        console.log("Set progress : ", currentProgress, " progressW ,", progressView.style.width);
        // Do not update the label in each step
        if (this.oldProgressStepLabelValue === 0) {
            this.oldProgressStepLabelValue = currentProgress
        } else if (currentProgress - this.oldProgressStepLabelValue > UPDATE_LABEL_STEP) {
            label.innerText = this.props.valueFormatter(currentProgress);
            this.oldProgressStepLabelValue = currentProgress;
        }

        this.calibrateLabelPosition(label);

        currentProgress += STEP;
        if (currentProgress > this.state.progress) {
            currentProgress = this.state.progress;
        }

        const nextInternal = MIN_INTERVAL + (MAX_INTERVAL * (1 - (this.state.progress - currentProgress)
            / this.state.progress));

        setTimeout(() => {
            this.loopAnimation(currentProgress, progressView, label)
        }, nextInternal);
    }

    componentDidMount() {
        const progressView = ReactDOM.findDOMNode(this).getElementsByClassName('progressview')[0];
        const label = ReactDOM.findDOMNode(this).getElementsByClassName('progressview-label')[0];
        const START_DELAY = 500;

        setTimeout(() => {
            this.loopAnimation(0, progressView, label)
        }, START_DELAY);

    }

    render() {
        return (
            <div className={'progressview-wrapper'}>
                <span className={'progressview-label'}>0%</span>
                <div className={'progressview'}/>
                <div className={'progressview-bg'}/>
            </div>
        )
    }
}
