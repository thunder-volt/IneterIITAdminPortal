import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Map from './components/Map'
import Dashboard from './components/Dashboard'
import VerticalLinearStepper from './components/Home'
import './styles/Sidebar.css'
import './styles/Rider.css'
import './styles/Popper.css'
import LoadingScreen from './components/LoadingScreen'
import Login from './components/Login'
import PrivateComponent from './components/PrivateComponent'
import Orders from './components/Orders'
function App() {
	return (
		<div style={{ height: '100vh', display: 'flex' }}>
			<BrowserRouter>
				<Routes>
					<Route element={<PrivateComponent />}>
						<Route path='/map' element={<Map />} />
						<Route path='/order' element={<Orders />} />
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='/loading' element={<LoadingScreen />} />
						<Route path='/' element={<VerticalLinearStepper />}></Route>
					</Route>
					<Route path='/login' element={<Login />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
