import ClearSVG from '../graphics/weather/ClearSVG'
import CloudySVG from '../graphics/weather/CloudySVG'
import FogSVG from '../graphics/weather/FogSVG'
import RainSVG from '../graphics/weather/RainSVG'
import SnowSVG from '../graphics/weather/SnowSVG'
import ThunderstormSVG from '../graphics/weather/Thunderstorm'

const getWeatherIcon = (weatherString, stroke) => {
	switch (weatherString) {
		case 'Clear':
			return <ClearSVG stroke={stroke} />
		case 'Cloudy':
			return <CloudySVG stroke={stroke} />
		case 'Foggy':
			return <FogSVG stroke={stroke} />
		case 'Drizzle':
		case 'Rain':
			return <RainSVG stroke={stroke} />
		case 'Snow':
			return <SnowSVG stroke={stroke} />
		case 'Thunderstorm':
		case 'ThunderstormHail':
			return <ThunderstormSVG stroke={stroke} />
		default:
			return <ClearSVG stroke={stroke} />
	}
}

export default getWeatherIcon
