import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import { AppContext } from '../context'

const LargeContainer = styled(Box)(({ theme }) => ({
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
}))

const InformationContainer = ({ children }) => {
	// eslint-disable-next-line no-unused-vars
	const { isDesktop, isMobile, isTablet } = useContext(AppContext)
	return (
		<>
			{(isDesktop || isTablet) && <LargeContainer>{children}</LargeContainer>}
			{/* {isMobile && <DesktopContainer>{children}</DesktopContainer>} */}
		</>
	)
}

export default InformationContainer
