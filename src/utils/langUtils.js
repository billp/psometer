import _ from 'lodash'

function isVowel(char) {
  return /[αάεέηήιίϊοόυύϋωώ]/.test(char)
}

export function convertName(name = '') {
  let nameComponents = _.split(name, '')
  if (_.last(nameComponents) == 'ς') {
    let lastChars = _.chain(nameComponents)
                      .takeRight(3)
                      .dropRight()
                      .value()
    if (isVowel(_.last(lastChars)) && isVowel(_.last(lastChars))) {
      lastChars = _.chain(lastChars)
                    .dropRight()
                    .concat(['ε'])
                    .value()
    }
    return _.chain(name)
            .dropRight(3)
            .concat(lastChars)
            .join('')
            .value()
  }
  return name
}