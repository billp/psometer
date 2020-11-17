import React from 'react';
import { ReactComponent as LogoIcon } from '../../images/logo-icon.svg';
import styles from './Logo.module.css';
import { withRouter } from "react-router-dom"

class Logo extends React.Component {
    render() {
        return (
            <a href="#index" onClick={this.navigateToIndex.bind(this)}>
              <div className={styles.container}>
                  <div className={styles.main}>
                      <div className={styles.ps}>PS</div>
                      <div className={styles.icon}>
                          <LogoIcon width="50px" height="50px" />
                      </div>
                      <div className={styles.meter}>μετρο</div>
                  </div>
                  <div className={styles.small}>
                      Production support countdown timer
                  </div>
              </div>
            </a>
        )
    }

    navigateToIndex(e) {
      e.preventDefault()
      this.props.history.push("/")
    }
}

export default withRouter(Logo)