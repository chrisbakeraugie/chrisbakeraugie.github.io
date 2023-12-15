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
import getWeatherDescription from './js/getWeatherDescription'

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

const fetchWeatherAndSetState = async (setWeatherState) => {
	const currentTime = Math.floor(Date.now() / 1000)
	let weatherCodeIndex = null
	try {
		const weatherResponse = await fetch(
			'https://api.open-meteo.com/v1/forecast?latitude=40.6782&longitude=-73.9442&hourly=weather_code&timeformat=unixtime&forecast_days=1'
		)
		const weatherData = await weatherResponse.json()
		const timeArray = weatherData.hourly.time
		for (let i = 0; i < timeArray.length - 1; i++) {
			if (currentTime >= timeArray[i] && currentTime < timeArray[i + 1]) {
				weatherCodeIndex = i
			}
		}
		if (!weatherCodeIndex)
			throw new Error('Error parsing returned weather times')
		const currentWeather = getWeatherDescription(
			weatherData.hourly.weather_code[weatherCodeIndex]
		)
		setWeatherState(currentWeather)
	} catch (err) {
		console.error('Weather data failed to load:', JSON.stringify(err))
	}
}

function App() {
	const {
		setBackgroundColor,
		backgroundColor,
		setStrokeColor,
		setDistanceFromNoon,
		setWeatherData,
		weatherData,
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
		fetchWeatherAndSetState(setWeatherData)
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
			{weatherData}
			<RouterProvider router={router} />
		</AppContainer>
	)
}

export default App
