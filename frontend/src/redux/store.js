// ** Redux Imports
import rootReducer from './reducer/rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

export const store = configureStore({
  reducer: rootReducer,
  devTools: { trace: true, traceLimit: 25 },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})
export const persistor = persistStore(store)
