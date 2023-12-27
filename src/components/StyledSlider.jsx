import { Slider } from '@mui/material'
import { styled } from '@mui/material/styles'

const MUIStyledSlider = styled(Slider)(({ theme }) => ({
	position: 'fixed',
	transform: 'translateX(-50%)',
	left: '50%',
	[theme.breakpoints.up('lg')]: {
		bottom: 20,
		width: '90%',
		maxWidth: '1400px',
	},
	[theme.breakpoints.between('sm', 'lg')]: {
		bottom: 20,
		width: '80%',
	},
	[theme.breakpoints.down('sm')]: {
		bottom: 10,
		width: '70%',
	},
}))

const StyledSlider = (props) => {
	return <MUIStyledSlider {...props} />
}

export default StyledSlider
