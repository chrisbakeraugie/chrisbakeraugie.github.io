import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<header className="App-header"></header>
			</div>
		</ThemeProvider>
	)
}

export default App
