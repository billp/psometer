import { combineReducers } from 'redux'
import user from './user'
import configuration from './configuration'
import parameters from './parameters'

export default combineReducers({
  user,
  configuration,
  parameters
})