import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import { AppContext } from '../context'
import getWeatherIcon from '../js/getWeatherIcon'

const StyledWeatherBoxContainer = styled(Box)(({ theme, fontColor }) => ({
	position: 'absolute',
	bottom: 90,
	left: '63%',
	border: '3px solid',
	width: 300,
	height: 200,
	display: 'grid',
	gridTemplateColumns: 'repeat(4, 1fr)',
	gridTemplateRows: 'repeat(4, 1fr)',
	gridColumnGap: '0px',
	gridRowGap: '0px',
	zIndex: 1000,
	color: fontColor,
}))

const StyledLocationBox = styled(Box)(() => ({
	gridArea: '1 / 1 / 2 / 5',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
	border: '2px solid',
}))

const StyledCurrentWeatherBox = styled(Box)(() => ({
	gridArea: ' 2 / 1 / 5 / 3',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
	border: '2px solid',
}))

const StyledTimeBox = styled(Box)(() => ({
	gridArea: '2 / 3 / 5 / 5',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
	border: '2px solid',
}))

const WeatherBox = () => {
	const { fontColor, weatherData, location } = useContext(AppContext)
	return (
		<StyledWeatherBoxContainer fontColor={fontColor}>
			<StyledLocationBox>
				<Typography>{location}</Typography>
			</StyledLocationBox>
			<StyledCurrentWeatherBox>
				<Typography>Current Weather</Typography>
				{/* Format the stuff */}
				{getWeatherIcon(weatherData)}
				<Typography>{weatherData}</Typography>
			</StyledCurrentWeatherBox>
			<StyledTimeBox>
				<Typography>NYC Time</Typography>
				<Typography>8:00 pm</Typography>
				<Typography>Slider Time</Typography>
				<Typography>8:00 pm</Typography>
			</StyledTimeBox>
		</StyledWeatherBoxContainer>
	)
}

export default WeatherBox
