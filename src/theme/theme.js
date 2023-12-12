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
	customValues: {
		midnight: {
			background: 'rgba(10,25,47,1)',
			stroke: 'rgba(185,180,44,1)',
		},
		morning: {
			background: 'rgba(25,55,255,1)',
			stroke: 'rgba(121,235,255,1)',
		},
		noon: {
			background: 'rgba(121,235,255,1)',
			stroke: 'rgba(255,255,255,1)',
		},
	},
})

export default theme
