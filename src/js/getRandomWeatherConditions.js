const getRandomWeatherConditions = () => {
	const conditions = [
		'Thunderstorm',
		'Rain',
		'Clear',
		'Snow',
		'ThunderstormHail',
		'Cloudy',
		'Foggy',
		'Drizzle',
	]
	const randomCondition =
		conditions[Math.floor(Math.random() * conditions.length)]
	const randomTemperature = Math.floor(Math.random() * (115 - -15 + 1)) - 15

	return {
		conditions: randomCondition,
		temperature: randomTemperature,
	}
}

export default getRandomWeatherConditions
