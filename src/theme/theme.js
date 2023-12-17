import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#556cd6',
		},
		secondary: {
			main: '#19857b',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1285,
			xl: 1536,
		},
	},
	customValues: {
		midnight: {
			background: 'rgba(10,25,47,1)',
			stroke: 'rgba(185,180,44,1)',
		},
		morning: {
			background: 'rgba(84,192,255,1)',
			stroke: 'rgba(255,255,255,1)',
		},
		noon: {
			background: 'rgba(0,217,255,1)',
			stroke: 'rgba(255,255,255,1)',
		},
	},
	typography: {
		fontFamily: 'Poppins, sans-serif',
	},
})

export default theme
