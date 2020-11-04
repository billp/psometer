import React from 'react';
import { SimpleLayout } from '../../SimpleLayout/SimpleLayout';
import { TextField } from '../../TextField/TextField';
import { AnimatedButton } from '../../AnimatedButton/AnimatedButton';
import styles from './WelcomeScreen.module.css';
import { ReactComponent as FallIcon } from '../../../images/fall-icon.svg';
import { connect } from 'react-redux';
import { updateName } from '../../../actions'

class WelcomeScreen extends React.Component {
    state = {
        name: null
    }

    render() {
        return (
            <SimpleLayout>
                <FallIcon class={styles['fall-icon']} width="250px" height="250px" />
                <div class={styles['welcome-text']}>Καλωσήρθες στο PSόμετρο, τον μοναδικό σου σύμμαχο σε αυτές τις δύσκολες ώρες του production support. 
                    Να θυμάσαι ότι επιστρέφοντας από αυτό το ταξίδι, δεν θα είσαι ο ίδιος/α που ήσουν.</div>
                <div class={styles['name-input-text']}>Αν είσαι έτοιμος/η, πληκτρολόγησε το όνομά σου και πάτησε το κουμπί "συνέχεια".</div>
                <form className={styles.form} onSubmit={this.handleSubmit.bind(this)}>
                    <TextField
                        name="name" 
                        label="Όνομα"
                        value={this.state.name}
                        onChange={e => this.setState({name: e.target.value})}
                    />
                    <div class={styles['submit-button']}>
                        <AnimatedButton>Συνέχεια →</AnimatedButton>
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
        this.props.updateName(this.state.name)
        console.log(this.props)
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
 
const mapDispatchToProps = dispatch => {
  return {
    updateName: name => { dispatch(updateName(name)) }
  }
}
  
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(WelcomeScreen)