import { UPDATE_NAME_TYPE } from '../actions'

const initialState = {
    name: null
}

export default (state = initialState, action) => {
  switch (action.type) {
      case UPDATE_NAME_TYPE:
        return { ...state, name: action.name }
      default:
        return state
  }
}