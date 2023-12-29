import { useContext, useMemo } from 'react'
import { AppContext } from '../context'
import AnimatedThunderstorm from '../graphics/weather/animations/AnimatedThunderstorm'
import AnimatedFog from '../graphics/weather/animations/AnimatedFog'
import AnimatedRain from '../graphics/weather/animations/AnimatedRain'
import AnimatedCloud from '../graphics/weather/animations/AnimatedCloud'
import AnimatedSnowFlake from '../graphics/weather/animations/AnimatedSnowFlake'

const useWeatherToDisplay = () => {
	const { weatherData, isMobile } = useContext(AppContext)
	const numberOfCloudsToCreate = isMobile ? 3 : 5
	const snowflakes = useMemo(() => {
		return Array.from({ length: 5 }, (_, i) => (
			<AnimatedSnowFlake key={i} id={i} />
		))
	}, [])

	const clouds = useMemo(() => {
		return Array.from({ length: numberOfCloudsToCreate }, (_, i) => (
			<AnimatedCloud key={i} id={i} />
		))
	}, [isMobile])

	const rain = useMemo(() => {
		return Array.from({ length: 5 }, (_, i) => <AnimatedRain key={i} id={i} />)
	}, [])

	const weatherToDisplay = useMemo(() => {
		switch (weatherData.conditions) {
			case 'Cloudy':
				return clouds
			case 'Foggy':
				return <AnimatedFog />
			case 'Drizzle':
			case 'Rain':
				return rain
			case 'Snow':
				return snowflakes
			case 'Thunderstorm':
			case 'ThunderstormHail':
				return <AnimatedThunderstorm />
			default:
				return null
		}
	}, [weatherData, clouds, rain, snowflakes])

	return weatherToDisplay
}

export default useWeatherToDisplay
