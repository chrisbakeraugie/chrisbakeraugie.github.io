import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledInformationContainer = styled(Box)(({ theme }) => ({
	position: 'absolute',
	left: '50%',
	transform: 'translateX(-50%)',
	top: 60,
	width: '70%',
	maxWidth: 1100,
	minHeight: 350,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
	gap: theme.spacing(2),
	[theme.breakpoints.down('lg')]: {
		width: '80%',
	},
	[theme.breakpoints.down('sm')]: {
		width: '90%',
	},
}))

const InformationContainer = ({ children }) => {
	return <StyledInformationContainer>{children}</StyledInformationContainer>
}

export default InformationContainer
