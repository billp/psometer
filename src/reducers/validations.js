import { 
  SET_VALIDATION_ERROR, 
  CLEAR_ALL_SETTINGS, 
  CLEAR_ALL_VALIDATION_ERRORS,
  VALIDATE_FIELDS
} from '../actions'
import _ from 'lodash'

const initialState = { 
  errors: { },
  validateFields: [ ]
}

export default (state = initialState, action) => {
  console.log(action)

  switch (action.type) {
      case SET_VALIDATION_ERROR:
        let newState = {
          ...state, 
          errors: { 
            ...state.errors,
            [action.name]: action.error 
          }
        }
        if (action.error == undefined) {
          _.unset(newState.errors, action.name)
        } 

        // Remove validation from list
        newState.validateFields = _.dropWhile(newState.validateFields, (o) => o == action.name)

        return newState
      case CLEAR_ALL_SETTINGS, CLEAR_ALL_VALIDATION_ERRORS:
        return { 
          ...initialState, 
          errors: { } 
        }
      case VALIDATE_FIELDS:
        return {
          ...state,
          validateFields: action.names
        }
      default:
        return state
  }
}