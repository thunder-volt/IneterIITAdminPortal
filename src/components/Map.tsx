/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect } from 'react'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../styles/MapDisplay.css'
import '../styles/Marker.css'
import mapboxgl from 'mapbox-gl'
import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder'
import RiderModal from './RiderModal'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import { Theme } from '../store/features/themeToggle/ToggleTheme'
import { useAppSelector, useAppDispatch } from '../store/app/Hooks'
import { riderSelector, setCurrentRider } from '../store/features/Rider'
import { updateRoute } from '../services/mapServices'
import { themeSelector } from '../store/features/themeToggle/Toggle'
import { colors } from '../utils/colors'
import SideBarModule from './SideBarModule'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import InventoryIcon from '@mui/icons-material/Inventory'
import '../styles/Popper.css'
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
}
const Map = () => {
	const map: any = useRef(null)
	const mapContainer = useRef<HTMLDivElement>(null)
	const [marker, setMarker] = useState<any>(null)
	const [mapState, setMap] = useState<any>(null)

	const [zoom] = useState(15)
	const theme = useAppSelector(themeSelector)
	const currentRider = useAppSelector(riderSelector)?.currentRider
	const riders = useAppSelector(riderSelector)?.rider
	const [open, setOpen] = useState(false)
	const handleClose = () => {
		setOpen(!open)
	}
	const dispatch = useAppDispatch()
	const [openDynamic, setOpenDynamic] = useState(false)
	const handleOpenDynamic = () => setOpenDynamic(true)
	const handleCloseDynamic = () => setOpenDynamic(false)
	const setMarkers = (Riders = riders) => {
		console.log(Riders)
		mapboxgl.accessToken =
			'pk.eyJ1IjoiaXNodTExNDQwNyIsImEiOiJjbGNpcHdqdjkwMnplM29xbXJjdXRoM3hiIn0.7bDoT4N8RAglxqUzf8lKvg'
		map.current = new mapboxgl.Map({
			container: mapContainer.current || '',
			style: theme,
			center: [77.638725, 12.971599],
			zoom: zoom,
		})
		Riders?.forEach((rider: any, index: number) => {
			rider.order?.forEach((packag: any) => {
				new mapboxgl.Marker({ color: colors[index] })
					.setLngLat([packag?.address.lng, packag?.address.lat])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }) // add popups
							.setHTML(
								`<div style=background-color:white;width:150px;height:100px>
								<h4 style=text-align:center>Name : ${packag.productId}</h4>
								<div style=text-align:center >${packag.name} </div>
								<div style=text-align:center >Latitude: ${packag.address.lat} </div>
								<div style=text-align:center >Longitude: ${packag.address.lng} </div>
								</div>`
							)
					)
					.addTo(map.current)
			})
			if (rider.order?.length > 0) {
				const el = document.createElement('div')
				el.className = 'marker'
				el.classList.add('marker')
				const marker = new mapboxgl.Marker(el)
					.setLngLat([77.638725, 12.971599])
					.setPopup(
						new mapboxgl.Popup({ offset: 25 }) // add popups
							.setHTML(
								`<div style=background-color:white;width:150px;height:100px >
									<h4 style=text-align:center>Name : ${rider.rider.username}</h4>
									<div style=text-align:center >Package delivered: ${rider.order.length} </div>
									<div style=text-align:center >Package left: 0 </div>
									<div style=text-align:center >Latitude: ${rider.order[0].address.lat} </div>
									<div style=text-align:center >Longitude: ${rider.order[0].address.lng} </div>
									</div>	`
							)
					)
					.addTo(map.current)
				setMarker(marker)
			}
		})
		const house = document.createElement('div')
		house.className = 'marker-warehouse'
		house.classList.add('marker-warehouse')
		new mapboxgl.Marker(house)
			.setLngLat([77.638725, 12.971599])
			.addTo(map.current)
		const search = new MapBoxGeocoder({
			accessToken: mapboxgl.accessToken,
			marker: false,
			mapboxgl: mapboxgl,
			collapsed: true,
		})

		// Actions on map
		map.current.addControl(search, 'top-right')
		map.current.addControl(new mapboxgl.NavigationControl())
		// map.current.addControl(draw)
		// map.current.on('draw.create', updateRoute)
		// map.current.on('draw.update', updateRoute)
		setMap(map.current)
	}
	useEffect(() => {
		if (currentRider.length === 0) {
			setMarkers()
			return
		}
		setMarkers(currentRider)
	}, [currentRider, theme])
	useEffect(() => {
		const getData = async () => {
			await fetch('https://growwsimplee.coursepanel.in/riders/routing', {
				mode: 'no-cors',
			})
				.then(res => res.json())
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
		}
		getData()
	}, [])

	return (
		<>
			<SideBarModule />
			<div className='theme'>
				<Theme />
			</div>
			<div className='dynamic-location'>
				<Button
					onClick={handleOpenDynamic}
					sx={{
						color: '#000',
					}}
				>
					Dynamic Points
				</Button>
				<Modal
					open={openDynamic}
					onClose={handleCloseDynamic}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
				>
					<Box sx={style}>
						<Typography
							id='modal-modal-title'
							variant='h6'
							component='h2'
							sx={{
								textAlign: 'center',
							}}
						>
							Add Dynamic Points
						</Typography>
						<TextField
							id='filled-multiline-static'
							label='Address'
							multiline
							placeholder='Type..'
							rows={4}
							variant='filled'
							sx={{
								width: '100%',
								mt: 2,
							}}
						/>
						<Button
							variant='outlined'
							sx={{
								mt: 2,
							}}
							onClick={handleCloseDynamic}
						>
							Submit
						</Button>
					</Box>
				</Modal>
			</div>
			<div
				style={{
					position: 'absolute',
					top: '170px',
					right: '0px',
					zIndex: '99999',
				}}
			>
				<Button
					onClick={() => {
						dispatch(setCurrentRider([]))
					}}
					sx={{
						borderRadius: '50%',
						height: '60px',
						width: '60px',
						backgroundColor: 'white',
						color: 'black',
						marginRight: '3px',
					}}
				>
					<DirectionsBikeIcon />
				</Button>
			</div>
			<div>
				<div
					ref={mapContainer}
					className='map.current-container'
					style={{ height: '100vh', width: '100vw' }}
				/>
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: '110px',
					right: '14px',
					zIndex: '99999',
				}}
			>
				<Button
					variant='contained'
					sx={{
						borderRadius: '50%',
						height: '60px',
						backgroundColor: 'white',
						color: 'black',
						marginRight: '3px',
					}}
					onClick={() => {
						if (currentRider.length === 0) {
							alert('Please select a rider')
							return
						}
						updateRoute(currentRider[0], mapState, marker)
					}}
				>
					<PlayArrowIcon />
				</Button>
				<Button
					variant='contained'
					onClick={() => handleClose()}
					sx={{
						borderRadius: '50%',
						height: '60px',
						backgroundColor: 'white',
						color: 'black',
					}}
				>
					<InventoryIcon />
				</Button>
			</div>
			<div>
				<RiderModal open={open} handleClose={handleClose} />
			</div>
		</>
	)
}

export default Map
