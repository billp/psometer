import React from 'react';
import { SimpleLayout } from '../../../SimpleLayout/SimpleLayout';
import { TextField } from '../../../TextField/TextField';
import { AnimatedButton } from '../../../AnimatedButton/AnimatedButton';
import styles from './SetParameters.module.css';
import { ReactComponent as TopIcon } from '../../../../images/settings-icon.svg';
import { connect } from 'react-redux';
import { updateName } from '../../../../actions'
import { withRouter } from "react-router-dom";
import { compose } from 'redux';
import { CountdownView } from '../../../CountdownView/CountdownView'

class SetParameters extends React.Component {
    state = {
        start_date: null,
        end_date: null
    }

    render() {
        return (
            <SimpleLayout>
                <TopIcon class={styles['settings-icon']} width="150px" height="150px" />
                <div class={styles['welcome-text']}>Γεια σου {this.state.name}, θα χρειαστώ κάποιες πληροφορίες για να setάρω το PSΌμετρό σου.</div>
                <form className={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                    <TextField
                        name="start-date" 
                        label="Ημερομηνία έναρξης Production Support"
                        value={this.state.start_date}
                        onChange={e => this.setState({start_date: e.target.value})}
                        readonly="readonly"
                    />
                    <TextField
                        name="start-date" 
                        label="Ημερομηνία λήξης Production Support"
                        value={this.state.end_date}
                        onChange={e => this.setState({end_date: e.target.value})}
                    />
                    <div>
                      <AnimatedButton 
                        className={styles['animated-button-left']}
                        onClick={this.props.history.goBack}>← Πίσω</AnimatedButton>
                      <AnimatedButton className={styles['animated-button-right']}>Συνέχεια →</AnimatedButton>
                    </div>

                </form>
            </SimpleLayout>
        )
    }

    componentDidMount() {
      this.setState({
        name: this.props.user.name
      })
    }

    handleSubmit(e) {
        e.preventDefault()
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
 
// const mapDispatchToProps = dispatch => {
//   return {
//     updateName: name => { dispatch(updateName(name)) }
//   }
// }
  
export default compose(
  withRouter,
  connect(mapStateToProps)
)(SetParameters)