import React from 'react'
import { ReactComponent as Status1 } from '../../../images/statuses/1.svg'
import { ReactComponent as Status2 } from '../../../images/statuses/2.svg'
import { ReactComponent as Status3 } from '../../../images/statuses/3.svg'
import { ReactComponent as Status4 } from '../../../images/statuses/4.svg'
import { ReactComponent as Status5 } from '../../../images/statuses/5.svg'
import styles from './CountdownScreen.module.css'

export function allStatuses(name, iconSize = 200) {
  return [{
      maxProgress: 0.2,
      text:  name + " σε αυτήν την φάση δεν ξέρεις τι σου γίνεται παρά την πολυετή εμπειρία που ενδεχομένως να διαθέτεις. Μην σκας όμως, είναι ακόμα αρχή και θα χρειαστεί λίγος χρόνος μέχρι να αρχίσεις να καταλαβαίνεις τι παίζει.",
      status: "Noob",
      icon: <Status1 className={styles.avatar} width={`${iconSize}px`} height={`${iconSize}px`} />
    },
    {
      maxProgress: 0.4,
      text: name + " εχεις περάσει την φάση της εκπαίδευσης και προσπαθείς να εφαρμόσεις αυτά που σου έμαθαν, χωρίς όμως μεγάλη επιτυχία. Κάνεις λάθη και αυτό έχει επίπτωση στην ψυχολογία σου αυξάνοντας τα επίπεδα του άγχους σου.",
      status: "Noob level 2",
      icon: <Status2 className={styles.avatar} width={`${iconSize}px`} height={`${iconSize}px`} />
    },
    {
      maxProgress: 0.6,
      text: name + " εχεις αρχίσει να μαθαίνεις από τα λάθη σου και να έχεις μεγαλύτερη εμπιστοσύνη στον εαυτό σου. Τα εποικοινωνιακά σου skills έχουν αρχίσει να βελτιόνονται.",
      status: "Noob level 3",
      icon: <Status3 className={styles.avatar} width={`${iconSize}px`} height={`${iconSize}px`} />
    },
    {
      maxProgress: 0.8,
      text: name + " αν εχεις φτάσει μέχρι εδώ ζωντανός/ή υπάρχουν πολλές πιθανότητες να ολοκληρώσεις την αποστολή σου μέχρι το τέλος. Έχεις φάει το περισσότερο damage και φαίνεται να αντέχεις το φορτίο.",
      status: "Survivor",
      icon: <Status4 className={styles.avatar} width={`${iconSize}px`} height={`${iconSize}px`} />
    },
    {
      maxProgress: 1.0,
      text: name + " έχεις μάθει όλες τις διαδικασίες του PS και είσαι έτοιμος/η να μεταλαμπαδεύσεις τις γνώσεις σου στον επόμενο τυχερό/η. Ετοιμάζεσαι να επιστρέψεις στην ηρεμία και την ασφάλεια της implementation ομάδας σου.",
      status: "Pro",
      icon: <Status5 className={styles.avatar} width={`${iconSize}px`} height={`${iconSize}px`} />
    }]
}