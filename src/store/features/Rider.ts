import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/Store'
import { Rider } from '../../makeData/geo'
export interface Rider {
	id: string
	riderId: string
	endTime: number
	order: Array<{
		id: string
		productId: string
		name: string
		status: string
		awb: string
		isDynamicPoint: boolean
		reachTime: number
		deliveryTime: number
		deliveryLat: number
		deliveryLng: number
		clusterId: string
		address: {
			id: string
			address: string
			lat: number
			lng: number
			orderId: string
		}
	}>
	rider: {
		id: string
		username: string
		password: string
		fcmToken: string
	}
}

interface RiderState {
	rider: Array<Rider>
	currentRider: Array<Rider>
}
const initialState: RiderState = {
	rider: Rider,
	currentRider: [],
}

export const riderSlice = createSlice({
	name: 'rider',
	initialState,
	reducers: {
		setCurrentRider: (state, action) => {
			state.currentRider = action.payload
		},
		setRider: (state, action) => {
			state.rider = action.payload
		},
	},
})

export const { setCurrentRider, setRider } = riderSlice.actions
export const riderSelector = (state: RootState) => state.rider
export default riderSlice.reducer
