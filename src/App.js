import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'
import { CssBaseline } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/Error/ErrorPage'
import HomePage from './pages/Home/HomePage'
import GraphicsContainer from './graphics/GraphicsContainer'

const router = createBrowserRouter([
	{ path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
	// { path: '/about', element: <AboutPage />, errorElement: <ErrorPage /> },
	// { path: '/experience', element: <ExperiencePage />, errorElement: <ErrorPage /> },
	// { path: '/contact', element: <ContactPage />, errorElement: <ErrorPage /> },
])

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<CssBaseline />
				<header className="App-header"></header>
				<RouterProvider router={router} />
				<GraphicsContainer />
			</div>
		</ThemeProvider>
	)
}

export default App
