import { Box } from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import FoggySVG from './FoggySVG'
import { useContext } from 'react'
import { AppContext } from '../../../context'

const moveClouds = keyframes`
    0% { transform: translateX(0);}
    100% { transform: translateX(100%); }
`

const StyledFog = styled(Box)(({ theme }) => {
	const duration = 60 * 7

	return {
		animation: `${moveClouds} linear infinite ${duration}s 0s`,
		position: 'absolute',
		bottom: -150,
		left: 0,
		width: '100%',
		height: '100%',
		opacity: 0.8,
		[theme.breakpoints.between('sm', 'lg')]: {
			width: '200%',
			height: '100%',
		},
		// [theme.breakpoints.down('sm')]:{
		// 	bottom: -300,
		// 	height:600,
		// }
	}
})

const AnimatedFog = ({ key, id, stroke = 'white' }) => {
	const { isMobile } = useContext(AppContext)
	return (
		<StyledFog key={key} id={id}>
			<FoggySVG stroke={stroke} />
			{isMobile && ( //Add some more fog vertically if on mobile
				<>
					<FoggySVG stroke={stroke} />
					<FoggySVG stroke={stroke} />
					<FoggySVG stroke={stroke} />
				</>
			)}
		</StyledFog>
	)
}

export default AnimatedFog
