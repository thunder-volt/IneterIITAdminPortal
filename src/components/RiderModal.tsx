/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Modal,
	Box,
	Table,
	TableContainer,
	Paper,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material'
import { useAppSelector } from '../store/app/Hooks'
import { riderSelector } from '../store/features/Rider'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '60%',
	height: 450,
	bgcolor: 'background.paper',
	boxShadow: 2,
	p: 4,
	overflowY: 'scroll',
	scrollbarWidth:'thin',
	zIndex: 999999,
}

const RiderModal = (props: { open: any; handleClose: any }) => {
	const { open, handleClose } = props
	const currentRider = useAppSelector(riderSelector).currentRider
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: '600px' }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Customer Name </TableCell>
									<TableCell align='right'>Package </TableCell>
									<TableCell align='right'>Location </TableCell>
									<TableCell align='right'>Latitude</TableCell>
									<TableCell align='right'>Longitude</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{currentRider[0]?.order?.map((row: any, index: number) => (
									<TableRow
										key={index}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component='th' scope='row'>
											{row.name}
										</TableCell>
										<TableCell align='right'>{row?.productId}</TableCell>
										<TableCell align='right'>{row?.address?.location}</TableCell>
										<TableCell align='right'>{row?.address?.lat}</TableCell>
										<TableCell align='right'>{row?.address?.lng}</TableCell>
										{/* <TableCell align='right'>{row.fat}</TableCell>
										<TableCell align='right'>{row.carbs}</TableCell>
										<TableCell align='right'>{row.protein}</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Modal>
		</div>
	)
}

export default RiderModal
