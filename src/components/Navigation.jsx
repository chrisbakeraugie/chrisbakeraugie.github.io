import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import { AppContext } from '../context'
import { Link } from 'react-router-dom'
import StyledButton from './StyledButton'

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
			<Link to="/experience">
				<StyledButton fontColor={fontColor}>Experience</StyledButton>
			</Link>
			<StyledButton fontColor={fontColor}>Contact</StyledButton>
		</StyledNavigationBox>
	)
}

export default Navigation
