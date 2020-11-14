import { combineReducers } from 'redux'
import user from './user'
import configuration from './configuration'
import parameters from './parameters'
import validations from './validations'

export default combineReducers({
  user,
  configuration,
  parameters,
  validations
})