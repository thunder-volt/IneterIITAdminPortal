import '../styles/Dashboard.css';
import img9 from '../assets/sunglasses.jpg'
import SidebarMenu from './Sidebar'
import LineStyle from './Charts/LineStyle'
import ColumnPlot from './Charts/ColumnPlot'
import ProgressChart from './Charts/Progress'
import '../styles/Home.css'
import img from '../assets/growsimplee.png'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../store/app/Hooks'
import { riderSelector } from '../store/features/Rider'

const Dashboard = () => {
	const [onTime, setOneTime] = useState(95.43)
	const [fake, setfake] = useState(6.23)
	const riders = useAppSelector(riderSelector)?.rider
	console.log(riders)
	const ridersCount = riders.length
	const orderCount = riders.map(e => e.order.length).reduce((e, a) => e + a)
	const navigate = useNavigate()
	useEffect(() => {
		setInterval(() => {
			if (onTime >= 100) {
				setOneTime(95.43)
			} else {
				setOneTime(Math.round((onTime + Math.random() * 2) * 100) / 100)
			}
			if (fake >= 10) {
				setfake(6.23)
			} else {
				setfake(
					Math.round((fake + Math.round(Math.random() * 200) / 100) * 100) / 100
				)
			}
		}, 4000)
	}, [])
	return (
		<>
			<SidebarMenu />
			<section className='home-section'>
				<nav
					className='nav-home'
					onClick={() => {
						navigate('/')
					}}
				>
					<img src={img} alt='' className='logo-img' />
				</nav>
				<div className='home-content'>
					<div className='overview-boxes'>
						<div className='box'>
							<div className='right-side'>
								<div className='box-topic'>Total Order</div>
								<div className='number'>{orderCount}</div>
								<div className='indicator'></div>
							</div>
						</div>
						<div className='box'>
							<div className='right-side'>
								<div className='box-topic'>Total Riders</div>
								<div className='number'>{ridersCount}</div>
								<div className='indicator'></div>
							</div>
						</div>
						<div className='box'>
							<div className='right-side'>
								<div className='box-topic'>Fake delivery %</div>
								<div className='number'>{fake}%</div>
								<div className='indicator'></div>
							</div>
						</div>
						<div className='box'>
							<div className='right-side'>
								<div className='box-topic'>On time delivery %</div>
								<div className='number'>{onTime}%</div>
								<div className='indicator'></div>
							</div>
						</div>
					</div>

					<div className='sales-boxes'>
						<div className='recent-sales box'>
							<div className='title'>Order Details</div>
							<div className='sales-details'>
								<ul className='details'>
									<li className='topic'>Product Id</li>
									{riders.map((rider) => (rider.order.map((e, key) => (
										<li key={key}>{e.productId}</li>
									))))}
								</ul>
								<ul className='details'>
									<li className='topic'>Customer</li>
									{riders.map((rider) => (rider.order.map((e, key) => (
										<li key={key}>{e.name}</li>
									))))}
								</ul>
								<ul className='details'>
									<li className='topic'>Rider</li>
									{riders.map((rider) => (rider.order.map((e, key) => (
										<li key={key}>{rider.rider.username}</li>
									))))}
								</ul>
								<ul className='details'>
									<li className='topic'>Duration</li>
									{riders.map((rider) => (rider.order.map((e, key) => (
										<li key={key}>{e.reachTime}</li>
									))))}
								</ul>
							</div>
						</div>
						<div className='top-sales box'>
							<div className='title'>Rider statistics</div>
							<ul className='top-sales-details'>
								{riders.slice(1, 8).map((e, key) => (
									<li key={key}>
										<a href='#'>
											<img src={img9} alt='' />
											<span className='product'>{e?.rider?.username}</span>
										</a>
										<span className='price'>
											<ProgressChart />
										</span>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className='charts'>
						<div className='line'>
							<div
								className='title'
								style={{ fontSize: '24px', marginBottom: '10px', fontWeight: '500' }}
							>
								Package delivered vs Rider
							</div>
							<LineStyle />
						</div>
						<div className='line'>
							<div
								className='title'
								style={{ fontSize: '24px', marginBottom: '10px', fontWeight: '500' }}
							>
								Fake Attempt % vs Rider
							</div>
							<ColumnPlot />
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Dashboard
