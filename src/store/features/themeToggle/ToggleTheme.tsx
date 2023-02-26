import { useDispatch } from 'react-redux'
import { themChangerStr, themChangerSat } from './Toggle'
import { FaMap, FaSatellite } from 'react-icons/fa'
export function Theme() {
	const dispatch = useDispatch()
	return (
		<>
			<div className={'st-sat'}>
				<button
					aria-label='Increment value'
					className='toggle-button'
					onClick={() => dispatch(themChangerStr())}
				>
					<FaMap />
					Streets
				</button>
				<button
					aria-label='Decrement value'
					className='toggle-button'
					onClick={() => dispatch(themChangerSat())}
				>
					<FaSatellite />
					Satellite
				</button>
			</div>
		</>
	)
}
