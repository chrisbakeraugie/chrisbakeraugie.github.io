import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import { AppContext } from '../context'
import WeatherBox from '../components/WeatherBox'
import RightGraphicsSVG from './RightGraphicsSVG'

const scale = 0.5

const StyledGraphicsContainer = styled(Box)(({ color, theme }) => ({
	position: 'absolute',
	bottom: 40,
	height: 400,
	width: '100vw',
	overflow: 'hidden',
	backgroundColor: color,
	display: 'flex',
	justifyContent: 'space-between',
	padding: theme.spacing(2),
}))

const PositionedRightGraphic = styled(Box)(() => ({
	width: 150,
	transform: `scale(${scale})`,
	transformOrigin: 'bottom left',
}))

const MobileGraphicsContainer = () => {
	const { backgroundColor, strokeColor } = useContext(AppContext)
	return (
		<StyledGraphicsContainer color={backgroundColor}>
			<PositionedRightGraphic>
				<RightGraphicsSVG fill={backgroundColor} stroke={strokeColor} />
			</PositionedRightGraphic>
			<WeatherBox />
		</StyledGraphicsContainer>
	)
}

export default MobileGraphicsContainer
