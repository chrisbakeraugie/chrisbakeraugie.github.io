import { Box } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import FoggySVG from './FoggySVG'

const moveClouds = keyframes`
    0% { transform: translateX(0);}
    100% { transform: translateX(100%); }
`

const StyledFog = styled(Box)(() => {
	const duration = 60 * 7

	return {
		animation: `${moveClouds} linear infinite ${duration}s 0s`,
		position: 'absolute',
		bottom: -150,
		left: 0,
		width: '100%',
		height: '100%',
		opacity: 0.8,
	}
})

const AnimatedFog = ({ key, id, stroke = 'white' }) => {
	return (
		<StyledFog key={key} id={id}>
			<FoggySVG stroke={stroke} />
		</StyledFog>
	)
}

export default AnimatedFog
