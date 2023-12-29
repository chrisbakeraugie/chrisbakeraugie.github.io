import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import LeftGraphicsSVG from './LeftGraphicsSVG'
import RightGraphicsSVG from './RightGraphicsSVG'
import { useContext } from 'react'
import { AppContext } from '../context'
import WeatherBox from '../components/WeatherBox'
import useWeatherToDisplay from '../components/useWeatherToDisplay'

const scale = 0.8

const StyledGraphicsContainer = styled(Box)(({ color }) => ({
	width: '100vw',
	maxWidth: '1440px',
	height: '100vh',
	position: 'fixed',
	overflow: 'hidden',
	top: 0,
	left: '50%',
	transform: 'translateX(-50%)',
	backgroundColor: color,
}))

const PositionedLeftGraphic = styled(Box)(() => ({
	position: 'absolute',
	bottom: 'calc(0px + 77px)',
	left: 0,
	transform: `scale(${scale})`,
	transformOrigin: 'bottom left',
}))

const PositionedRightGraphic = styled(Box)(() => ({
	position: 'absolute',
	bottom: 'calc(0px + 77px)',
	right: 0,
	zIndex: -1,
	transform: `scale(${scale})`,
	transformOrigin: 'bottom right',
}))

const DesktopGraphicsContainer = () => {
	const { backgroundColor, strokeColor } = useContext(AppContext)
	const weatherToDisplay = useWeatherToDisplay()

	return (
		<StyledGraphicsContainer color={backgroundColor}>
			<PositionedLeftGraphic>
				{weatherToDisplay}
				<LeftGraphicsSVG fill={backgroundColor} stroke={strokeColor} />
			</PositionedLeftGraphic>
			<PositionedRightGraphic>
				<RightGraphicsSVG fill={backgroundColor} stroke={strokeColor} />
			</PositionedRightGraphic>
			<WeatherBox />
		</StyledGraphicsContainer>
	)
}

export default DesktopGraphicsContainer
