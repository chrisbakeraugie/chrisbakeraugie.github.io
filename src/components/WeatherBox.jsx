import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context'
import getWeatherIcon from '../js/getWeatherIcon'
import getEastCoastTime from '../js/getEastCoastTime'

const StyledWeatherBoxContainer = styled(Box)(({ fontColor }) => ({
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

const StyledCurrentWeatherBox = styled(Box)(({ theme }) => ({
	gridArea: ' 2 / 1 / 5 / 3',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-around',
	alignItems: 'center',
	textAlign: 'center',
	border: '2px solid',
	gap: theme.spacing(1),
}))

const StyledTimeBox = styled(Box)(({ theme }) => ({
	gridArea: '2 / 3 / 5 / 5',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
	border: '2px solid',
	gap: theme.spacing(1),
}))

const WeatherBox = () => {
	const { fontColor, weatherData, location, strokeColor } =
		useContext(AppContext)
	const [displayTime, setDisplayTime] = useState(getEastCoastTime())

	useEffect(() => {
		const updateTime = () => {
			setDisplayTime(getEastCoastTime())
		}
		const now = new Date()
		const msUntilNextMinute =
			60000 - (now.getSeconds() * 1000 + now.getMilliseconds())
		const timeout = setTimeout(updateTime, msUntilNextMinute)
		const interval = setInterval(updateTime, 60000)

		return () => {
			clearTimeout(timeout)
			clearInterval(interval)
		}
	}, [])
	return (
		<StyledWeatherBoxContainer fontColor={fontColor}>
			<StyledLocationBox>
				<Typography>{location}</Typography>
			</StyledLocationBox>
			<StyledCurrentWeatherBox>
				<Typography>Current Weather</Typography>
				{getWeatherIcon(weatherData.conditions, strokeColor)}
				<Typography>{weatherData.conditions}</Typography>
			</StyledCurrentWeatherBox>
			<StyledTimeBox>
				<Typography>NYC Time</Typography>
				<Typography>{displayTime}</Typography>
				<Typography>Temperature</Typography>
				<Typography>{weatherData.temperature + '°F'}</Typography>
			</StyledTimeBox>
		</StyledWeatherBoxContainer>
	)
}

export default WeatherBox
