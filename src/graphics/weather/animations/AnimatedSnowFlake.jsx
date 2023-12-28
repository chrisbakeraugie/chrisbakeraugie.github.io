import { Box } from '@mui/material'
import SnowflakeSVG from '../../SnowflakeSVG'
import { styled, keyframes } from '@mui/material/styles'

const fall = keyframes`
    0%, 100% { 
        transform: translateY(-10px) translateX(10px); 
        opacity: 0;
    }
    10% { transform: translateY(10vh) translateX(-10px); opacity: 1; }
    20% { transform: translateY(20vh) translateX(20px); }
    30% { transform: translateY(30vh) translateX(-20px); }
    40% { transform: translateY(40vh) translateX(20px); }
    50% { transform: translateY(50vh) translateX(-20px); }
    60% { transform: translateY(60vh) translateX(20px); }
    70% { transform: translateY(70vh) translateX(-20px); }
    80% { transform: translateY(80vh) translateX(20px); }
    90% { transform: translateY(90vh) translateX(-20px); }
`
const StyledSnowFlake = styled(Box)(({ id }) => {
	const duration = Math.random() * 15 + 7
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

const AnimatedSnowFlake = ({
	key,
	id,
	height = '20px',
	width = '20px',
	stroke = 'white',
}) => {
	return (
		<StyledSnowFlake key={key} id={id}>
			<SnowflakeSVG height={height} stroke={stroke} width={width} />
		</StyledSnowFlake>
	)
}

export default AnimatedSnowFlake
