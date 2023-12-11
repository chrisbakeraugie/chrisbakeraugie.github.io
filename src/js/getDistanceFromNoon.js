const getDistanceFromNoon = (sliderValue) => {
	const distanceFromMidpoint = Math.abs(sliderValue - 50)
	return ((50 - distanceFromMidpoint) / 50) * 100
}
export default getDistanceFromNoon
