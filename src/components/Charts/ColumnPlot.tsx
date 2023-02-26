import { useAppSelector } from '../../store/app/Hooks'
import { riderSelector } from '../../store/features/Rider'
import { Column } from '@ant-design/plots'
import { useEffect, useState } from 'react'

const ColumnPlot = () => {
	const riders = useAppSelector(riderSelector)?.rider
	const [data, setData] = useState<any>([])
	useEffect(() => {
		setData(
			riders.map(e => ({
				username: e.rider.username,
				fake: Math.round((6.2 + Math.round(Math.random() * 200) / 100) * 100) / 100,
			}))
		)
	}, [])

	const config = {
		data,
		xField: 'username',
		yField: 'fake',
		xAxis: {
			label: {
				autoRotate: false,
			},
		},
		slider: {
			start: 0.1,
			end: 0.2,
		},
	}

	return <Column {...config} />
}

export default ColumnPlot
