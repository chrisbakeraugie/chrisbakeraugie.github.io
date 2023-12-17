import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const DesktopContainer = styled(Box)(({ theme }) => ({
	position: 'absolute',
	left: '50%',
	transform: 'translateX(-50%)',
	top: '50',
	backgroundColor: 'red',
}))

const InformationContainer = ({ isDesktop, isTablet, isMobile, children }) => {
	return <>{isDesktop && <DesktopContainer>{children}</DesktopContainer>}</>
}

export default InformationContainer
