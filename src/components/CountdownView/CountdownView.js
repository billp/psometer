import * as React from "react";
import './CountdownView.scss'
import moment from 'moment'
import ReactTooltip from "react-tooltip";
import {calcWorkingDays} from "../../utils/DateUtils";

export class CountdownView extends React.Component {

    constructor(props) {
        super(props);

        this.startTime = this.getNowTime() - moment(props.start).unix();

        // Init state with empty values
        this.state = {
            diff: 0,
            days: '',
            hours: '',
            mins: '',
            secs: ''
        };
    }

    getEndTime() {
      // Add hours to correct the end of working day (18:00)
      return this.props.end + 18 * 60 * 60
    }

    getStartTime() {
      // Add hours to correct the start of working day (09:30)
      return this.props.start + 9.5 * 60 * 60
    }

    /**
     * Return now date as millis
     * @returns {number}
     */
    getNowTime() {
        return moment().unix();
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
        if (this.getNowTime() > end ||
            this.getStartTime() > this.getEndTime() ||
            this.getNowTime() < this.getStartTime()) {
          this.setState({
              diff: 0,
              days: '',
              hours: '',
              mins: '',
              secs: ''
          })
          return
        }

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

        // Try to calc working days for only new changed days
        let workingDays;
        if (this.state.days !== days) {
            workingDays = calcWorkingDays(start, end);
        } else {
            workingDays = this.state.workingdays;
        }

        this.setState({
            diff: diff,
            workingdays: workingDays + " εργάσιμες",
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
        let playTime = this.getNowTime() - this.startTime;
        this.calcDiff(this.startTime + playTime, this.getEndTime());
    }

    calculateProgress() {
      const now = this.getNowTime()
      if (now > this.getEndTime()) {
        return 1
      }
      if (now < this.getStartTime()) {
        return 0
      }
      const progress = (now-this.getStartTime())/(this.getEndTime()-this.getStartTime())
      return progress
    }

    componentDidMount() {
      window.addEventListener('resize', this.notifyForUpdate.bind(this))

      setInterval(() => {
        this.notifyForUpdate()
      }, 1000)

      this.notifyForUpdate()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.notifyForUpdate.bind(this))
    }

    notifyForUpdate() {
      this.updateDate()
      this.props.progressUpdate(this.calculateProgress())
    }

    render() {
      return (
        <div className={this.props.className}>
          <span className={'countdown-view'}>
              <ul>
              <li>Ελευθέρωση σε</li>
              {this.state.workingdays ?
                <li>
                  <a href="#working_day"
                    onClick={e => e.preventDefault()}
                    className="days-component"
                    data-tip={this.state.workingdays}>{this.state.days}</a>
                    <ReactTooltip className="days-tooltip-component" place="bottom" type="light" effect="solid"  />
                </li> : ''}

              {this.state.hours ? <li><span className="hours-component">{this.state.hours}</span></li> : ''}
              {this.state.mins ? <li><span className="minutes-component">{this.state.mins}</span></li> : ''}
              {this.state.secs ? <li><span className="seconds-component">{this.state.secs}</span></li> : ''}

              </ul>
          </span>
        </div>
      )
    }
}

CountdownView.defaultProps = {
  progressUpdate: (currentValue) => { return 0.4 }
}
