import { SET_VALIDATION_ERROR } from '../actions'

const initialState = { }

export default (state = initialState, action) => {
  switch (action.type) {
      case UPDATE_NAME_TYPE:
        return { 
          ...state, 
          [action.name]: action.error 
        }
      case CLEAR_ALL_SETTINGS:
        return { }
      default:
        return state
  }
}