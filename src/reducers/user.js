import { UPDATE_NAME_TYPE, CLEAR_ALL_SETTINGS } from '../actions'

const initialState = {
    name: null
}

export default (state = initialState, action) => {
  switch (action.type) {
      case UPDATE_NAME_TYPE:
        return { ...state, name: action.name }
      case CLEAR_ALL_SETTINGS:
        return { }
      default:
        return state
  }
}