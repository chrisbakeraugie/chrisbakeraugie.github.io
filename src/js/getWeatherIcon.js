import ClearSVG from '../graphics/weather/ClearSVG'
import CloudySVG from '../graphics/weather/CloudySVG'
import FogSVG from '../graphics/weather/FogSVG'
import RainSVG from '../graphics/weather/RainSVG'
import SnowSVG from '../graphics/weather/SnowSVG'
import ThunderstormSVG from '../graphics/weather/Thunderstorm'

const getWeatherIcon = (weatherString, fill, stroke) => {
	switch (weatherString) {
		case 'Clear':
			return <ClearSVG fill={fill} stroke={stroke} />
		case 'Cloudy':
			return <CloudySVG fill={fill} stroke={stroke} />
		case 'Foggy':
			return <FogSVG fill={fill} stroke={stroke} />
		case 'Drizzle':
		case 'Rain':
			return <RainSVG fill={fill} stroke={stroke} />
		case 'Snow':
			return <SnowSVG fill={fill} stroke={stroke} />
		case 'Thunderstorm':
		case 'ThunderstormHail':
			return <ThunderstormSVG fill={fill} stroke={stroke} />
		default:
			return <ClearSVG fill={fill} stroke={stroke} />
	}
}

export default getWeatherIcon
