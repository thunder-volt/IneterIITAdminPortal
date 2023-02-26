import { Line } from '@ant-design/plots'
import { useAppSelector } from '../../store/app/Hooks'
import { riderSelector } from '../../store/features/Rider'
const LineStyle = () => {
	const riders = useAppSelector(riderSelector)?.rider
	const data = riders.map(e => ({
		username: e.rider.username,
		package: e.order.length,
	}))
	const config = {
		data,
		xField: 'username',
		yField: 'package',
		yAxis: {
			label: {
				formatter: (v: any) =>
					`${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
			},
		},
		seriesField: 'type',
	}

	return <Line {...(config as any)} />
}

export default LineStyle
