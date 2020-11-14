export const UPDATE_NAME_TYPE = 'UPDATE_NAME_TYPE'
export const UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED = 'UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED'
export const UPDATE_COUNTDOWN_PARAMS = 'UPDATE_COUNTDOWN_PARAMS'
export const CLEAR_ALL_SETTINGS = 'CLEAR_ALL_SETTINGS'
export const SET_VALIDATION_ERROR = 'SET_VALIDATION_ERROR'
export const CLEAR_ALL_VALIDATION_ERRORS = 'CLEAR_ALL_VALIDATION_ERRORS'
export const VALIDATE_FIELDS = 'VALIDATE_FIELDS'

// User
export const updateName = name => ({
    type: UPDATE_NAME_TYPE,
    name
})  

// Configuration
export const updateConfigurationInitialSetupCompleted = initialSetupCompleted => ({
  type: UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED,
  initialSetupCompleted
})

// Countdown Params
export const updateCountdownParams = (startDate, endDate) => ({
  type: UPDATE_COUNTDOWN_PARAMS,
  startDate,
  endDate
})

// Clear all settings
export const clearAllSettings = () => ({
  type: CLEAR_ALL_SETTINGS
})

// Validations
export const setValidationError = (name, error) => ({
  type: SET_VALIDATION_ERROR,
  name,
  error
})

export const clearValidationError = (name) => ({
  type: SET_VALIDATION_ERROR,
  name,
  error: undefined
})

export const clearAllValidationErrors = (name) => ({
  type: CLEAR_ALL_VALIDATION_ERRORS,
})

export const validateFields = (names) => dispatch => {
  dispatch({
    type: VALIDATE_FIELDS,
    names
  })
  return Promise.resolve()
}