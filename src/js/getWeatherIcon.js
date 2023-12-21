import ClearSVG from '../graphics/weather/ClearSVG'
import CloudySVG from '../graphics/weather/CloudySVG'
import FogSVG from '../graphics/weather/FogSVG'
import RainSVG from '../graphics/weather/RainSVG'
import SnowSVG from '../graphics/weather/SnowSVG'
import ThunderstormSVG from '../graphics/weather/Thunderstorm'

const getWeatherIcon = (weatherString) => {
	switch (weatherString) {
		case 'Clear':
			return <ClearSVG />
		case 'Cloudy':
			return <CloudySVG />
		case 'Foggy':
			return <FogSVG />
		case 'Drizzle':
		case 'Rain':
			return <RainSVG />
		case 'Snow':
			return <SnowSVG />
		case 'Thunderstorm':
		case 'ThunderstormHail':
			return <ThunderstormSVG />
		default:
			return <ClearSVG />
	}
}

export default getWeatherIcon
