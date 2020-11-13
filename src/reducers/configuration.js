import { UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED, CLEAR_ALL_SETTINGS } from '../actions'

const initialState = {
    initialSetupCompleted: false
}

export default (state = initialState, action) => {
  switch (action.type) {
      case UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED:
        return { ...state, initialSetupCompleted: action.initialSetupCompleted }
      case CLEAR_ALL_SETTINGS:
        return { }
      default:
        return state
  }
}