import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import LeftGraphicsSVG from './LeftGraphicsSVG'
import RightGraphicsSVG from './RightGraphicsSVG'

const StyledGraphicsContainer = styled(Box)(({ theme }) => ({
	width: '100vw',
	maxWidth: '1440px',
	height: '100vh',
	position: 'fixed',
	overflow: 'hidden',
	top: 0,
	left: '50%',
	transform: 'translateX(-50%)',
	zIndex: -1,
}))

const PositionedLeftGraphic = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	left: 0,
}))

const PositionedRightGraphic = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: 'calc(0px + 77px)',
	right: 0,
	zIndex: -1,
}))

const GraphicsContainer = () => {
	return (
		<StyledGraphicsContainer>
			<PositionedLeftGraphic>
				<LeftGraphicsSVG fill="white" stroke="black" />
			</PositionedLeftGraphic>
			<PositionedRightGraphic>
				<RightGraphicsSVG fill="white" stroke="black" />
			</PositionedRightGraphic>
		</StyledGraphicsContainer>
	)
}

export default GraphicsContainer
