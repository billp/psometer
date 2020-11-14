import React from 'react';
import { SimpleLayout } from '../../../SimpleLayout/SimpleLayout';
import TextField from '../../../TextField/TextField';
import { AnimatedButton } from '../../../AnimatedButton/AnimatedButton';
import styles from './WelcomeScreen.module.css';
import { ReactComponent as TopIcon } from '../../../../images/fall-icon.svg';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateName, validateFields } from '../../../../actions'
import { withRouter } from "react-router-dom";
import { Form } from '../../../Form/Form'
import _ from 'lodash';

class WelcomeScreen extends React.Component {
    state = {
        name: null,
        shouldSubmit: false
    }

    render() {
      return (
          <SimpleLayout>
              <TopIcon class={styles['fall-icon']} width="200px" height="200px" />
              <div class={styles['welcome-text']}>Καλωσήρθες στο PSόμετρο, τον μοναδικό σου σύμμαχο σε αυτές τις δύσκολες ώρες του production support. 
                  Να θυμάσαι ότι επιστρέφοντας από αυτό το ταξίδι, δεν θα είσαι ο ίδιος/α που ήσουν.</div>
              <div class={styles['name-input-text']}>Αν είσαι έτοιμος/η, πληκτρολόγησε το όνομά σου και πάτησε το κουμπί "συνέχεια".</div>
              <Form className={styles.form} 
                onSubmit={this.handleSubmit.bind(this)}>
                  <TextField
                      name="name" 
                      label="Όνομα"
                      value={this.state.name}
                      onChange={e => {
                        this.setState({name: e.target.value})
                      }}
                  />
                  <div class={styles['submit-button']}>
                      <AnimatedButton>Συνέχεια →</AnimatedButton>
                  </div>
              </Form>
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

        this.props.validateFields(['name']).then(() => {
          if (this.isFormValid()) {
            this.props.updateName(this.state.name)
            this.props.history.push("/init/step2");  
          }
        })
    }

    isFormValid() {
      return this.props.validationErrors['name'] == undefined
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        validationErrors: state.validations.errors
    }
}
 
const mapDispatchToProps = dispatch => {
  return {
    updateName: name => { dispatch(updateName(name)) },
    validateFields: (names, cb) => dispatch(validateFields(names)).then(cb)
  }
}
  
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeScreen)