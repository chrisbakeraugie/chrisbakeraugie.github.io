import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import LeftGraphicsSVG from '../LeftGraphicsSVG'
import RightGraphicsSVG from '../RightGraphicsSVG'
import { useContext } from 'react'
import { AppContext } from '../../context'

const StyledGraphicsContainer = styled(Box)(({ color }) => ({
	width: '100vw',
	maxWidth: '1440px',
	height: '100vh',
	position: 'fixed',
	overflow: 'hidden',
	top: 0,
	left: '50%',
	transform: 'translateX(-50%)',
	// zIndex: 0,
	backgroundColor: color,
}))

const PositionedLeftGraphic = styled(Box)(() => ({
	position: 'absolute',
	bottom: 0,
	left: 0,
}))

const PositionedRightGraphic = styled(Box)(() => ({
	position: 'absolute',
	bottom: 'calc(0px + 77px)',
	right: 0,
	zIndex: -1,
}))

const DesktopGraphicsContainer = () => {
	const { backgroundColor, strokeColor } = useContext(AppContext)
	return (
		<StyledGraphicsContainer color={backgroundColor}>
			<PositionedLeftGraphic>
				<LeftGraphicsSVG fill={backgroundColor} stroke={strokeColor} />
			</PositionedLeftGraphic>
			<PositionedRightGraphic>
				<RightGraphicsSVG fill={backgroundColor} stroke={strokeColor} />
			</PositionedRightGraphic>
		</StyledGraphicsContainer>
	)
}

export default DesktopGraphicsContainer
