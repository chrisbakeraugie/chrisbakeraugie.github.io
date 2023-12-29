import { Box } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import RaindropSVG from './RaindropSVG'

const fall = keyframes`
    0%, 10% { 
        transform: translateY(-10px); 
        opacity: 0;
    }
    15% { transform: translateY(10vh); opacity: 1; }
    30% { transform: translateY(30vh); }
    45% { transform: translateY(50vh); }
    60% { transform: translateY(70vh); }
    75% { transform: translateY(85vh); }
    85% { transform: translateY(95vh); }
    100% { transform: translateY(100vh); opacity: 0; }
`

const StyledRain = styled(Box)(() => {
	const duration = 4
	const delay = Math.random() * 4 + 1
	const leftPosition = Math.random() * 90 + 5

	return {
		animation: `${fall} linear infinite`,
		animationDuration: `${duration}s`,
		animationDelay: `${delay}s`,
		position: 'absolute',
		top: '-50px',
		left: `${leftPosition}%`,
		width: '20px',
		height: '20px',
		opacity: 0,
	}
})

const AnimatedRain = ({ key, id, stroke = 'white' }) => {
	return (
		<StyledRain key={key} id={id}>
			<RaindropSVG strokeColor={stroke} />
		</StyledRain>
	)
}

export default AnimatedRain
