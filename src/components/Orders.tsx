import { useEffect, useState } from 'react'
import {
	Table,
	TableContainer,
	Paper,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material'
import SidebarMenu from './Sidebar'
import '../styles/Home.css'

const Orders = () => {
	const [orders, setOrders] = useState([
		{
			objectType: 'Cuboid',
			dimensions: '20*30*30',
			area: 600,
			height: 20,
			volume: 18000,
			weight: 2.5,
			qrData: '',
		},
	])
	useEffect(() => {
		const getData = async () => {
			await fetch('https://growwsimplee.coursepanel.in/orders/items')
				.then(res => res.json())
				.then(res => {
					console.log(res)
					setOrders([...orders, ...res])
				})
				.catch(err => console.log(err))
		}
		getData()
	}, [])
	return (
		<>
			<SidebarMenu />
			<div style={{ margin: '20px' }}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: '600px' }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 'bold' }}>Object Type </TableCell>
								<TableCell align='right' sx={{ fontWeight: 'bold' }}>
									Dimensions
								</TableCell>
								<TableCell align='right' sx={{ fontWeight: 'bold' }}>
									Area
								</TableCell>
								<TableCell align='right' sx={{ fontWeight: 'bold' }}>
									Height
								</TableCell>
								<TableCell align='right' sx={{ fontWeight: 'bold' }}>
									Volume
								</TableCell>
								<TableCell align='right' sx={{ fontWeight: 'bold' }}>
									Weight
								</TableCell>
								<TableCell align='right' sx={{ fontWeight: 'bold' }}>
									QR
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders?.map(
								(
									row: {
										objectType: string
										dimensions: string
										area: number
										height: number
										volume: number
										weight: number
										qrData: string
									},
									index: number
								) => (
									<TableRow
										key={index}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component='th' scope='row'>
											{row?.objectType}
										</TableCell>
										<TableCell align='right'>{row?.dimensions}</TableCell>
										<TableCell align='right'>{row?.area}</TableCell>
										<TableCell align='right'>{row?.height}</TableCell>
										<TableCell align='right'>{row?.volume}</TableCell>
										<TableCell align='right'>{row?.weight}</TableCell>
										<TableCell align='right'>{row?.qrData}</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</>
	)
}

export default Orders
