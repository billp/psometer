import * as React from "react";
import './CountdownView.scss'

export class CountdownView extends React.Component {

    constructor(props) {
        super(props);

        this.startTime = this.getNowTime();

        // Init state with empty values
        this.state = {
            diff: 0,
            days: '',
            hours: '',
            mins: '',
            secs: ''
        };
    }

    /**
     * Return now date as millis
     * @returns {number}
     */
    getNowTime() {
        return (new Date()).getTime();
    }

    /**
     * Returns the final string for a date part.
     *
     * @param part Accepts the values D for day , H for hour, M for minute, S for second.
     * @param value A negative value will return an empty string
     * @returns {string}
     */
    formatDatePart(part, value) {
        if (value <= 0) {
            return '';
        }

        const plural = value === 1 ? 'one' : 'more';
        const PARTS = {
            D: {
                one: 'ημέρα',
                more: 'ημέρες'
            },
            H: {
                one: 'ώρα',
                more: 'ώρες'
            },
            M: {
                one: 'λεπτό',
                more: 'λεπτά'
            },
            S: {
                one: 'δευτερόλεπτο',
                more: 'δευτερόλεπτα'
            }
        };

        if (PARTS[part] && PARTS[part][plural]) {
            return value + ' ' + PARTS[part][plural]
        }
        return ''; // return empty for unknown part
    }

    /**
     * Calculate the time diff and days, hours, minutes and seconds and update the state with the final strings
     * @param start
     * @param end
     */
    calcDiff(start, end) {
        const DAY_IN_SECONDS = 24 * 60 * 60;
        const HOUR_IN_SECONDS = 60 * 60;
        const MIN_IN_SECONDS = 60;

        // Diff in seconds
        let diff = end - start;

        const days = Math.floor(diff / DAY_IN_SECONDS);
        diff -= days * (DAY_IN_SECONDS);
        const hours = Math.floor(diff / HOUR_IN_SECONDS);
        diff -= hours * (HOUR_IN_SECONDS);
        const mins = Math.floor(diff / MIN_IN_SECONDS);
        diff -= mins * (MIN_IN_SECONDS);
        const secs = Math.floor(diff);

        this.setState({
            diff: diff,
            days: this.formatDatePart('D', days),
            hours: this.formatDatePart('H', hours),
            mins: this.formatDatePart('M', mins),
            secs: this.formatDatePart('S', secs),
        });
    }

    /**
     * Update the date based on now time
     */
    updateDate() {
        let playTime = (this.getNowTime() - this.startTime) / 1000;
        this.calcDiff(this.props.start + playTime, this.props.end);
    }

    componentDidMount() {
        const that = this;
        setInterval(function () {
            that.updateDate()
        }, 1000)
    }

    render() {
        let text = '';
        if (this.state.diff > 0) {
            text =
                <span className={'countdown-view'}>
                    Ελευθέρωση σε {this.state.days} &nbsp;
                    {this.state.hours} &nbsp;
                    {this.state.mins} &nbsp;
                    {this.state.secs} &nbsp;
                </span>
        }

        return (
            <div>
                {text}
            </div>
        )
    }
}
