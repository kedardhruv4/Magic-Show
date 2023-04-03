// ** Reducers Imports
import layout from '../layout'
import navbar from '../navbar'
import authReducer from '../reducer/authReducer'
import storage from 'redux-persist/lib/storage'
import { Reducer, combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { PERSIST_KEY } from '../../constants/constants'

const persistConfig = {
  key: PERSIST_KEY,
  storage,
  whitelist: ['navbar', 'layout', 'authReducer']
}

const rootReducer = combineReducers({
  navbar,
  layout,
  authReducer
})

export default persistReducer(persistConfig, rootReducer)
