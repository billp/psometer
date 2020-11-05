import { combineReducers } from 'redux'
import user from './user'
import configuration from './configuration'

export default combineReducers({
  user,
  configuration
})