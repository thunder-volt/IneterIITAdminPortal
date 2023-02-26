import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/themeToggle/Toggle'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import riderSlice from '../features/Rider'
const persistConfig = {
	key: 'root',
	storage,
}
const rootReducer = combineReducers({
	rider: riderSlice,
	theme: themeReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
