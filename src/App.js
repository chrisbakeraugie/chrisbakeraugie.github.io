import { Box, CssBaseline, Slider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/Error/ErrorPage'
import HomePage from './pages/Home/HomePage'
import GraphicsContainer from './graphics/GraphicsContainer'
import amountOfDayComplete from './js/amountOfDayComplete'
import { useContext, useEffect } from 'react'
import getIntermediateColor from './js/getIntermediateColor'
import getDistanceFromNoon from './js/getDistanceFromNoon'
import { AppContext } from './context'
import { useTheme } from '@emotion/react'
import { styled } from '@mui/material/styles'

// eslint-disable-next-line no-unused-vars
const AppContainer = styled(Box)(({ theme, backgroundColor }) => ({
	width: '100vw',
	height: '100vh',
	overflow: 'hidden',
	backgroundColor,
}))

const router = createBrowserRouter([
	{ path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
	// { path: '/about', element: <AboutPage />, errorElement: <ErrorPage /> },
	// { path: '/experience', element: <ExperiencePage />, errorElement: <ErrorPage /> },
	// { path: '/contact', element: <ContactPage />, errorElement: <ErrorPage /> },
])

function App() {
	const {
		setBackgroundColor,
		backgroundColor,
		setStrokeColor,
		setDistanceFromNoon,
	} = useContext(AppContext)
	const theme = useTheme()

	useEffect(() => {
		const calculatedDistanceFromNoon = getDistanceFromNoon(
			amountOfDayComplete()
		)
		setDistanceFromNoon(calculatedDistanceFromNoon)
		setBackgroundColor(
			getIntermediateColor(
				calculatedDistanceFromNoon,
				theme.customValues,
				'background'
			)
		)
		setStrokeColor(
			getIntermediateColor(
				calculatedDistanceFromNoon,
				theme.customValues,
				'stroke'
			)
		)
	}, [])

	const handleHourChange = (event, newValue) => {
		const distanceFromNoon = getDistanceFromNoon(newValue)
		setBackgroundColor(
			getIntermediateColor(distanceFromNoon, theme.customValues, 'background')
		)
		setStrokeColor(
			getIntermediateColor(distanceFromNoon, theme.customValues, 'stroke')
		)
	}
	return (
		<AppContainer className="App" backgroundColor={backgroundColor}>
			<CssBaseline />
			<GraphicsContainer />
			<header className="App-header"></header>
			<Slider
				onChange={handleHourChange}
				defaultValue={amountOfDayComplete()}
			/>
			<RouterProvider router={router} />
		</AppContainer>
	)
}

export default App
