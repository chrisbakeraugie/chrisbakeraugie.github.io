import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context'
import getWeatherIcon from '../js/getWeatherIcon'
import getEastCoastTime from '../js/getEastCoastTime'

const StyledWeatherBoxContainer = styled(Box)(({ fontColor, theme }) => ({
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
	borderRadius: theme.spacing(1),
	[theme.breakpoints.down('lg')]: {
		position: 'unset',
		bottom: 'unset',
		left: 'unset',
		alignSelf: 'flex-end',
	},
	[theme.breakpoints.down('sm')]: {
		height: 160,
	},
}))

const StyledLocationBox = styled(Box)(({ theme }) => ({
	gridArea: '1 / 1 / 2 / 5',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
	border: '2px solid',
	borderTopLeftRadius: theme.spacing(0.5),
	borderTopRightRadius: theme.spacing(0.5),
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
	borderBottomLeftRadius: theme.spacing(0.5),
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
	borderBottomRightRadius: theme.spacing(0.5),
}))

const StyledFont = styled(Typography)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		fontSize: '12px',
	},
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
				<StyledFont>{location}</StyledFont>
			</StyledLocationBox>
			<StyledCurrentWeatherBox>
				<StyledFont>Current Weather</StyledFont>
				{getWeatherIcon(weatherData.conditions, strokeColor)}
				<StyledFont>{weatherData.conditions}</StyledFont>
			</StyledCurrentWeatherBox>
			<StyledTimeBox>
				<StyledFont>NYC Time</StyledFont>
				<StyledFont>{displayTime}</StyledFont>
				<StyledFont>Temperature</StyledFont>
				<StyledFont>{weatherData.temperature + '°F'}</StyledFont>
			</StyledTimeBox>
		</StyledWeatherBoxContainer>
	)
}

export default WeatherBox
