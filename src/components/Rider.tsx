import SearchBar from 'material-ui-search-bar'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CircleIcon from '@mui/icons-material/Circle';
const Rider = () => {
	return (
		<div className='rider-cont'>
			<h4>Rider</h4>
			<SearchBar />
			<div className='riders'>
				<div className='rider-info'>
					<AccountCircleIcon /> <div className='rider-name'>Ramesh</div>{' '}
					<CircleIcon sx={{ color: '#fff' }} />
				</div>
				<div className='rider-info'>
					<AccountCircleIcon /> <div className='rider-name'>Ramesh</div>{' '}
					<CircleIcon />
				</div>
				<div className='rider-info'>
					<AccountCircleIcon /> <div className='rider-name'>Ramesh</div>{' '}
					<CircleIcon />
				</div>
				<div className='rider-info'>
					<AccountCircleIcon /> <div className='rider-name'>Ramesh</div>{' '}
					<CircleIcon />
				</div>
			</div>
		</div>
	)
}

export default Rider
