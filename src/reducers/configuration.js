import { UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED } from '../actions'

const initialState = {
    initialSetupCompleted: false
}

export default (state = initialState, action) => {
  switch (action.type) {
      case UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED:
        return { ...state, name: action.initialSetupCompleted }
      default:
        return state
  }
}