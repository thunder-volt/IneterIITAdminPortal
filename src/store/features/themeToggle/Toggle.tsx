import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/Store'

export interface CounterState {
	value: string
}

const initialState: CounterState = {
	value: 'mapbox://styles/mapbox/streets-v12',
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		themChangerStr: state => {
			state.value = 'mapbox://styles/mapbox/streets-v12'
		},
		themChangerSat: state => {
			state.value = 'mapbox://styles/mapbox/satellite-v9'
		},
	},
})

export const { themChangerStr,themChangerSat } = counterSlice.actions
export const themeSelector = (state: RootState) => state.theme.value
export default counterSlice.reducer
