import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import { AppContext } from '../context'
import { Link } from 'react-router-dom'

const StyledNavigationBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	paddingTop: theme.spacing(2),
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-evenly',
}))

const StyledButton = styled(Button)(({ theme, fontColor }) => ({
	color: fontColor ? fontColor : 'white',
	fontWeight: theme.typography.fontWeightBold,
}))

const Navigation = () => {
	const { fontColor } = useContext(AppContext)
	return (
		<StyledNavigationBox>
			<Link to={'/'}>
				<StyledButton fontColor={fontColor}>Home</StyledButton>
			</Link>
			<Link to={'/about'}>
				<StyledButton fontColor={fontColor}>About</StyledButton>
			</Link>
			<StyledButton fontColor={fontColor}>Experience</StyledButton>
			<StyledButton fontColor={fontColor}>Contact</StyledButton>
		</StyledNavigationBox>
	)
}

export default Navigation
