import SearchBar from 'material-ui-search-bar'
import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import {
	Sidebar,
	Menu,
	MenuItem,
	useProSidebar,
	sidebarClasses,
} from 'react-pro-sidebar'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../store/app/Hooks'
import { Rider, riderSelector, setCurrentRider } from '../store/features/Rider'
import { colors } from '../utils/colors'
import Tooltip from '@mui/material/Tooltip'
import '../styles/Sidebar.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const SideBarModule = () => {
	const dispatch = useAppDispatch()
	const { collapseSidebar } = useProSidebar()
	const [clicked, setClicked] = useState(false)
	const navigate = useNavigate()
	const Rider = useAppSelector(riderSelector).rider
	return (
		<div className='left-holder'>
			<div className='sidebar'>
				<Sidebar
					backgroundColor='#14213d'
					width='176px'
					style={{ height: '100vh' }}
					rootStyles={{
						[`.${sidebarClasses.container}`]: {
							color: '#f1faee',
							// zIndex: 1,
						},
					}}
				>
					<Menu
						menuItemStyles={{
							button: {
								'&:hover': {
									backgroundColor: '#e63946',
								},
							},
						}}
					>
						<MenuItem
							icon={<MenuOutlinedIcon />}
							onClick={() => {
								collapseSidebar()
							}}
						>
							<h3>Admin</h3>
						</MenuItem>
						<MenuItem
							icon={<AddLocationAltIcon />}
							routerLink={<Link to='/map' />}
							onClick={() => {
								setClicked(!clicked)
							}}
						>
							Routes
						</MenuItem>
						<MenuItem
							icon={<AnalyticsIcon />}
							onClick={() => {
								setClicked(false)
								navigate('/dashboard')
							}}
						>
							Dashboard
						</MenuItem>
						<MenuItem
							icon={<AutoAwesomeIcon />}
							onClick={() => {
								setClicked(false)
								navigate('/order')
							}}
						>
							Orders
						</MenuItem>
						<MenuItem
							icon={<DeleteForeverIcon />}
							onClick={async () => {
								await fetch('https://growwsimplee.coursepanel.in/orders/clear')
									.then(res => {
										console.log(res)
										localStorage.removeItem('token')
										navigate('/login')
									})
									.catch(err => {
										console.log(err)
									})
							}}
						>
							Clear DB
						</MenuItem>
					</Menu>
				</Sidebar>
			</div>
			<div className={`rider ${clicked && 'hide'}`}>
				<div className={`rider-cont ${clicked && 'hide'}`}>
					<div className='rider-header'>
						<h4>Rider</h4>
					</div>
					<SearchBar />
					<div className='riders'>
						{Rider?.map((rider: Rider, index: number) => {
							return (
								<div
									key={index}
									className='rider-info'
									onClick={() => {
										dispatch(setCurrentRider([rider]))
									}}
								>
									<AccountCircleIcon />
									<Tooltip title={rider?.rider?.password} placement='top'>
										<div className='rider-name'>{rider?.rider?.username}</div>
									</Tooltip>
									{rider?.order.length === 0 ? null : (
										<div
											style={{
												backgroundColor: colors[index],
												width: '20px',
												height: '20px',
												borderRadius: '500%',
											}}
										></div>
									)}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SideBarModule
