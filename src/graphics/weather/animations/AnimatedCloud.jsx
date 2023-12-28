import { Box } from '@mui/material'
import SnowflakeSVG from '../../SnowflakeSVG'
import { styled, keyframes } from '@mui/material/styles'

const moveClouds = keyframes`
    0% { transform: translateX(-100%);}
    5% {opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
`

const StyledCloud = styled(Box)(({ id }) => {
	// const duration = Math.random() * 45 + 20 // Duration for cloud animation
	const duration = 30
	// Randomly position clouds between 50% to 80% vertically
	const bottom = `${50 + Math.random() * 30}vh`

	return {
		animation: `${moveClouds} linear infinite ${duration}s 0s`,
		position: 'absolute',
		bottom: bottom,
		left: `${Math.random() * 100}%`, // Random horizontal positioning
		width: '150px', // Adjust size as needed
		height: '80px', // Adjust size as needed
		opacity: 0, // Start with opacity 0
	}
})

const AnimatedCloud = ({
	key,
	id,
	height = '40px',
	width = '40px',
	stroke = 'white',
}) => {
	return (
		<StyledCloud key={key} id={id}>
			<SnowflakeSVG stroke={stroke} />
		</StyledCloud>
	)
}

export default AnimatedCloud
