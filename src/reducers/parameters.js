import { UPDATE_COUNTDOWN_PARAMS, CLEAR_ALL_SETTINGS } from '../actions'

const initialState = {
    start_date: null,
    end_date: null
}

export default (state = initialState, action) => {
  switch (action.type) {
      case UPDATE_COUNTDOWN_PARAMS:
        return { 
          ...state, 
          start_date: action.start_date, 
          end_date: action.end_date 
        }
      case CLEAR_ALL_SETTINGS:
        return { }
      default:
        return state
  }
}