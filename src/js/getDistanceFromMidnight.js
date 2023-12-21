const getDistanceFromMidnight = (sliderValue) => {
	if (sliderValue < 50) {
		const distanceFromMidpoint = Math.abs(50 - sliderValue)
		return ((50 - distanceFromMidpoint) / 50) * 100
	} else {
		const distanceFromMidpoint = Math.abs(sliderValue - 50)
		return ((50 - distanceFromMidpoint) / 50) * 100
	}
}
export default getDistanceFromMidnight
