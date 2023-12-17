import { Slider } from '@mui/material'
import { styled } from '@mui/material/styles'

const MUIStyledSlider = styled(Slider)(({ theme }) => ({
	position: 'fixed',
	[theme.breakpoints.up('lg')]: {
		bottom: 20,
		left: '50%',
		width: '90%',
		transform: 'translateX(-50%)',
		maxWidth: '1400px',
	},
}))

const StyledSlider = (props) => {
	return <MUIStyledSlider {...props} />
}

export default StyledSlider
