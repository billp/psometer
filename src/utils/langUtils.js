import _ from 'lodash'

function isVowel(char) {
  const vowels = _.split("αάεέηήιίϊοόυύϋωώ", "")
  return _.includes(vowels, char)
}

export function speakName(name = '') {
  let nameComponents = _.split(name, '')
  if (_.last(nameComponents) == 'ς') {
    let lastChars = _.chain(nameComponents)
                      .takeRight(3)
                      .dropRight()
                      .value()
    if (isVowel(_.last(lastChars)) && isVowel(lastChars[lastChars.length-2])) {
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