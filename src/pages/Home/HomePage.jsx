import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const HomePage = () => {
	const theme = useTheme()
	const isDesktop = useMediaQuery(theme.breakpoints.up('lg')) // Large screens
	const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')) // Medium screens
	const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Small screens

	return (
		<>
			{isDesktop && <p>Was desktop</p>}
			{isTablet && <p> isTablet</p>}
			{isMobile && <p>isMobile</p>}
		</>
	)
}

export default HomePage
