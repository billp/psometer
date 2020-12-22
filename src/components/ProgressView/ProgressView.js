import React, { createRef } from "react";
import './ProgressView.scss'
import _ from 'lodash'

export class ProgressView extends React.Component {
  constructor(props) {
    super(props)

    this.progressView = createRef(null)
    this.progressLabel = createRef(null)
  }


  render() {
    return (
      <div className={'progressview-wrapper' + (this.props.className ? ' ' + this.props.className : '')}>
          <span className={'progressview-label'}
              ref={this.progressLabel}
              style={{left: this.translateWidth(this.props.currentValue) + 'px'}}>
                {this.props.valueFormatter(this.props.currentValue)}
           </span>
          <div className={'progressview'} style={{width: this.translateWidth(this.props.currentValue) + 'px'}} />
          <div className={'progressview-bg'} ref={this.progressView}  />
      </div>
    )
  }

  translateWidth(value) {
    const offsetWidth = _.get(this.progressView, 'current.offsetWidth')
    return offsetWidth * value
  }

  labelWidth() {
    return _.get(this.progressLabel, 'current.offsetWidth')
  }
}

ProgressView.defaultProps = {
  minValue: 0,
  maxValue: 100,
  currentValue: 50,
  valueFormatter: (progress) => parseInt(progress) + '%'
}
