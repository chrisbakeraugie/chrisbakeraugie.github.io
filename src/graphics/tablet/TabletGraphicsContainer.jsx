import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import LeftGraphicsSVG from '../LeftGraphicsSVG'
// import RightGraphicsSVG from '../RightGraphicsSVG'
import { useContext } from 'react'
import { AppContext } from '../../context'
import WeatherBox from '../../components/WeatherBox'

const scale = 0.7

const StyledGraphicsContainer = styled(Box)(({ color, theme }) => ({
	position: 'absolute',
	bottom: 80,
	height: 500,
	width: '100vw',
	overflow: 'hidden',
	backgroundColor: color,
	display: 'flex',
	justifyContent: 'space-between',
	padding: theme.spacing(2),
}))

const PositionedLeftGraphic = styled(Box)(({ theme }) => ({
	width: 400,
	transform: `scale(${scale})`,
	transformOrigin: 'bottom left',
	[theme.breakpoints.down('md')]: {
		transform: `scale(${0.4})`,
	},
}))

const TabletGraphicsContainer = () => {
	const { backgroundColor, strokeColor } = useContext(AppContext)
	return (
		<StyledGraphicsContainer color={backgroundColor}>
			<PositionedLeftGraphic>
				<LeftGraphicsSVG fill={backgroundColor} stroke={strokeColor} />
			</PositionedLeftGraphic>
			<WeatherBox />
		</StyledGraphicsContainer>
	)
}

export default TabletGraphicsContainer
