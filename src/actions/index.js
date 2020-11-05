export const UPDATE_NAME_TYPE = 'UPDATE_NAME_TYPE'
export const UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED = 'UPDATE_CONFIGURATION_INITIAL_SETUP_COMPLETED'

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