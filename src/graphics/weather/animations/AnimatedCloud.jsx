import { Box } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import CloudsSVG from './CloudsSVG'

const moveClouds = keyframes`
    0% { transform: translateX(-100%);}
    5% {opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
`

const StyledCloud = styled(Box)(() => {
	const duration = 30
	const bottom = `${50 + Math.random() * 30}vh`

	return {
		animation: `${moveClouds} linear infinite ${duration}s 0s`,
		position: 'absolute',
		bottom: bottom,
		left: `${Math.random() * 100}%`,
		width: '150px',
		height: '80px',
		opacity: 0,
	}
})

const AnimatedCloud = ({ key, id, stroke = 'white' }) => {
	return (
		<StyledCloud key={key} id={id}>
			<CloudsSVG stroke={stroke} />
		</StyledCloud>
	)
}

export default AnimatedCloud
