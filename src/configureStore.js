import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import mainReducer from './reducers'
const persistConfig = {
    key: 'root2',
    storage,
    hardSet
}

const persistedReducer = persistReducer(persistConfig, mainReducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}