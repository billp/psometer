export const UPDATE_NAME_TYPE = 'UPDATE_NAME_TYPE'
export const UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED = 'UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED'
export const UPDATE_COUNTDOWN_PARAMS = 'UPDATE_COUNTDOWN_PARAMS'

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
export const updateCountdownParams = (start_date, end_date) => ({
  type: UPDATE_COUNTDOWN_PARAMS,
  start_date,
  end_date
})