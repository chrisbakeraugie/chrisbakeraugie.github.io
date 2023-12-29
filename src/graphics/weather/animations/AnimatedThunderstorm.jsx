import { Box } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import ThunderstormSVG from '../Thunderstorm'

const StyledThunderstorm = styled(Box)(({theme}) => ({

}))

const AnimatedSnowFlake = ({
	key,
	id,
	height = '20px',
	width = '20px',
	stroke = 'white',
}) => {
	return (
		<StyledThunderstorm key={key} id={id}>
			<ThunderstormSVG boltColor={'red'}  />
		</StyledThunderstorm>
	)
}

export default AnimatedSnowFlake
