import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import LeftGraphicsSVG from './LeftGraphicsSVG'
import RightGraphicsSVG from './RightGraphicsSVG'
import { useContext, useMemo } from 'react'
import { AppContext } from '../context'
import WeatherBox from '../components/WeatherBox'
import SnowflakeSVG from './SnowflakeSVG'

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

const StyledSnowFlake = styled(SnowflakeSVG)(() => ({}))

const DesktopGraphicsContainer = () => {
	const { backgroundColor, strokeColor } = useContext(AppContext)

	const snowflakes = useMemo(() => {
		const flakes = []
		for (let i = 0; i < 10; i++) {
			flakes.push(
				<StyledSnowFlake
					key={i}
					height={'20px'}
					id={i}
					stroke={'white'}
					width={'20px'}
				/>
			)
		}
		return flakes
	}, [strokeColor])

	return (
		<StyledGraphicsContainer color={backgroundColor}>
			<PositionedLeftGraphic>
				{snowflakes}
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
