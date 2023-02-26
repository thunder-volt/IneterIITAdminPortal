import React, { useState, useEffect } from 'react'
import { Progress } from '@ant-design/plots'

const ProgressChart = () => {
	const [config, setConfig] = useState({
		height: 40,
		width: 300,
		autoFit: false,
		percent: 0.536,
		barWidthRatio: 0.3,
	})
	useEffect(() => {
		setInterval(() => {
			setConfig({
				height: 40,
				width: 300,
				autoFit: false,
				percent: 0.536 + Math.random() * 0.01,
				barWidthRatio: 0.3,
			})
		}, 4000)
	}, [])
	return <Progress {...config} />
}

export default ProgressChart
