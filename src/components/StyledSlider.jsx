import { Slider, SliderThumb } from '@mui/material'
import { styled } from '@mui/material/styles'
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined'
import { useContext } from 'react'
import { AppContext } from '../context'

function SliderThumbComponent(props) {
	const { children, ...other } = props
	return (
		<SliderThumb {...other}>
			{children}
			<Brightness4OutlinedIcon />
		</SliderThumb>
	)
}

const MUIStyledSlider = styled(Slider)(
	({ theme, strokeColor, backgroundColor }) => ({
		color: strokeColor,
		height: 3,
		padding: '13px 0',
		'& .MuiSlider-thumb': {
			height: 27,
			width: 27,
			backgroundColor,
			border: '1px solid currentColor',
			'&:hover': {
				boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
			},
		},
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
	})
)

const StyledSlider = (props) => {
	const { strokeColor, backgroundColor } = useContext(AppContext)
	return (
		<MUIStyledSlider
			{...props}
			backgroundColor={backgroundColor}
			slots={{ thumb: SliderThumbComponent }}
			strokeColor={strokeColor}
		/>
	)
}

export default StyledSlider
