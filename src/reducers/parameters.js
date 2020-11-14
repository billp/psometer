import { UPDATE_COUNTDOWN_PARAMS, CLEAR_ALL_SETTINGS } from '../actions'

const initialState = {
    startDate: null,
    endDate: null
}

export default (state = initialState, action) => {
  switch (action.type) {
      case UPDATE_COUNTDOWN_PARAMS:
        return { 
          ...state, 
          startDate: action.startDate, 
          endDate: action.endDate 
        }
      case CLEAR_ALL_SETTINGS:
        return { }
      default:
        return state
  }
}