import { UPDATE_COUNTDOWN_PARAMS } from '../actions'

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
      default:
        return state
  }
}