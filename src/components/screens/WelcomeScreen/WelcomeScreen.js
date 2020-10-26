import React from 'react';
import { SimpleLayout } from '../../SimpleLayout/SimpleLayout';
import { TextField } from '../../TextField/TextField';
import styles from './WelcomeScreen.module.css';
import { ReactComponent as FallIcon } from '../../../images/fall-icon.svg';

export class WelcomeScreen extends React.Component {
    render() {
        return (
            <SimpleLayout>
                <FallIcon class={styles['fall-icon']} width="250px" height="250px" />
                <div class={styles['welcome-text']}>Καλωσήρθες στο PSόμετρο, τον μοναδικό σου σύμμαχο σε αυτές τις δύσκολες ώρες του production support. 
                    Να θυμάσαι ότι επιστρέφοντας από αυτό το ταξίδι, δεν θα είσαι ο ίδιος/α που ήσουν.</div>
                <div class={styles['name-input-text']}>Αν είσαι έτοιμος/η, πληκτρολόγησε το όνομά σου και πάτησε το κουμπί "συνέχεια".</div>
                <form class={styles.form} onSubmit={e => e.preventDefault()}>
                    <TextField name="name" label="Όνομα" />
                    <br />
                    <button>Συνέχεια</button>
                </form>
            </SimpleLayout>
        )
    }
}
