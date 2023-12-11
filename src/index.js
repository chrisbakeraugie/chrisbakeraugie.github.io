import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppProvider from './context'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<AppProvider>
				<App />
			</AppProvider>
		</ThemeProvider>
	</React.StrictMode>
)
