import { length, along, bearing, lineString, lineSlice } from '@turf/turf'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
/* eslint-disable @typescript-eslint/no-explicit-any */
const addRoute = (map: any, coords: any) => {
	if (map.getSource('route')) {
		map.removeLayer('route')
		map.removeSource('route')
	} else {
		map.addLayer({
			id: 'route',
			type: 'line',
			source: {
				type: 'geojson',
				data: {
					type: 'Feature',
					properties: {},
					geometry: coords,
				},
			},
			layout: {
				'line-join': 'round',
				'line-cap': 'round',
			},
			paint: {
				'line-color': '#011f4b',
				'line-width': 8,
				'line-opacity': 0.8,
			},
		})
	}
}
// draw
const draw = new MapboxDraw({
	displayControlsDefault: false,
	controls: {
		line_string: true,
		trash: true,
	},
	defaultMode: 'draw_line_string',
	styles: [
		{
			id: 'gl-draw-line',
			type: 'line',
			filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
			layout: {
				'line-cap': 'round',
				'line-join': 'round',
			},
			paint: {
				'line-color': '#011f4b',
				'line-dasharray': [0.2, 2],
				'line-width': 2,
				'line-opacity': 0.7,
			},
		},
		{
			id: 'gl-draw-polygon-and-line-vertex-halo-active',
			type: 'circle',
			filter: [
				'all',
				['==', 'meta', 'vertex'],
				['==', '$type', 'Point'],
				['!=', 'mode', 'static'],
			],
			paint: {
				'circle-radius': 12,
				'circle-color': '#FFF',
			},
		},
		{
			id: 'gl-draw-polygon-and-line-vertex-active',
			type: 'circle',
			filter: [
				'all',
				['==', 'meta', 'vertex'],
				['==', '$type', 'Point'],
				['!=', 'mode', 'static'],
			],
			paint: {
				'circle-radius': 8,
				'circle-color': '#011f4b',
			},
		},
	],
})
// updateRoute

function updateRoute(currentRider: any, map: any, marker: any) {
	removeRoute(map)
	const profile = 'driving'
	const coords = currentRider?.order.map((item: any) => {
		return [item.address.lng, item.address.lat]
	})
	coords.unshift([77.638725, 12.971599])
	coords.push([77.638725, 12.971599])
	console.log(coords)
	const newCoords = coords.join(';')
	const radius = coords.map(() => 15)
	getMatch(newCoords, radius, profile, map, marker)
}

async function getMatch(
	coordinates: any,
	radius: any[],
	profile: string,
	map: any,
	marker: any
) {
	const radiuses = radius.join(';')
	const query = await fetch(
		`https://api.mapbox.com/matching/v5/mapbox/${profile}/${coordinates}?geometries=geojson&radiuses=${radiuses}&steps=true&access_token=${mapboxgl.accessToken}`
	)
	const response = await query.json()
	if (response.code !== 'Ok') {
		alert('No roads avaiable')
		return
	}
	const coords = response.matchings[0].geometry
	// animation for marker motion
	const route = {
		type: 'FeatureCollection',
		features: [
			{
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: coords.coordinates,
				},
			},
		],
	}
	const lineDistance = length(route.features[0] as any)
	const arc = []
	const steps = 500
	for (let i = 0; i < lineDistance; i += lineDistance / steps) {
		const segment = along(route.features[0] as any, i)
		arc.push(segment.geometry.coordinates)
	}
	route.features[0].geometry.coordinates = arc
	let counter = 0
	addRoute(map, coords)
	fitMap(map, coords.coordinates)
	marker.setLngLat(route.features[0].geometry.coordinates[0]).addTo(map)
	function animate() {
		marker.setLngLat(route.features[0].geometry.coordinates[counter])
		// const upstreamPoint = along(
		// 	lineString(route.features[0].geometry.coordinates),
		// 	length(
		// 		lineSlice(
		// 			route.features[0].geometry.coordinates[0],
		// 			route.features[0].geometry.coordinates[counter],
		// 			route.features[0].geometry.coordinates
		// 		)
		// 	)
		// )
		// console.log(upstreamPoint)
		// console.log(
		// 	length(
		// 		lineSlice(
		// 			route.features[0].geometry.coordinates[0],
		// 			route.features[0].geometry.coordinates[counter],
		// 			route.features[0].geometry.coordinates
		// 		)
		// 	)
		// )
		// const downstreamPoint = along(
		// 	lineString(route.features[0].geometry.coordinates),
		// 	lineSlice(
		// 		route.features[0].geometry.coordinates[0],
		// 		route.features[0].geometry.coordinates[counter],
		// 		route.features[0].geometry.coordinates
		// 	) + 10
		// )
		// marker.setBearing(bearing(upstreamPoint, downstreamPoint))
		counter = counter + 1
		if (counter < steps) {
			requestAnimationFrame(animate)
		}
	}
	requestAnimationFrame(animate)
	function fitMap(map: any, coords: any) {
		const bounds = coords.reduce(function (
			bounds: { extend: (arg0: any) => any },
			coord: any
		) {
			return bounds.extend(coord)
		},
		new mapboxgl.LngLatBounds(coords[0], coords[0]))
		map.fitBounds(bounds, {
			padding: 30,
		})
	}
}

function removeRoute(map: any) {
	if (!map.getSource('route')) return
	map.removeLayer('route')
	map.removeSource('route')
}

export { addRoute, updateRoute, removeRoute, draw }
