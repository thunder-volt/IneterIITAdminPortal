import { useEffect, useState } from 'react'
import gif from '../assets/loader.gif'
import { useNavigate } from 'react-router-dom'
const LoadingScreen = () => {
	const navigate = useNavigate()
	const [message, setMessage] = useState('Started to Initialize')
	const messageFunction = () => {
		setTimeout(() => {
			setMessage('Generating Riders')
			setTimeout(() => {
				setMessage('Finding the best route')
				setTimeout(() => {
					setMessage('Ready to Go!')
					setTimeout(() => {
						navigate('/map')
						window.location.reload()
					}, 4000)
				}, 4000)
			}, 4000)
		}, 4000)
	}
	useEffect(() => {
		messageFunction()
	}, [])
	return (
		<div
			style={{
				height: '100vh',
				width: '100vw',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				background: '#f8f8f8',
			}}
		>
			<img src={gif} alt='' />

			{message}
		</div>
	)
}

export default LoadingScreen
