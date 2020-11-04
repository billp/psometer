import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { combineForms } from 'react-redux-form'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const user = {
    name: '',
    start_date: null,
    end_date: null
}

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, combineForms({ user }))

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}