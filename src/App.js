import { Box, CssBaseline } from '@mui/material'
import ErrorPage from './pages/Error/ErrorPage'
import HomePage from './pages/Home/HomePage'
import amountOfDayComplete from './js/amountOfDayComplete'
import { useContext, useEffect } from 'react'
import getIntermediateColor from './js/getIntermediateColor'
import { AppContext } from './context'
import { useTheme } from '@emotion/react'
import { styled } from '@mui/material/styles'
import getWeatherDescription from './js/getWeatherDescription'
import useMediaQuery from '@mui/material/useMediaQuery'
import StyledSlider from './components/StyledSlider'
import Navigation from './components/Navigation'
import AboutPage from './pages/About/AboutPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InformationContainer from './components/InformationContainer'
import ExperiencePage from './pages/Experience/ExperiencePage'
import getDistanceFromMidnight from './js/getDistanceFromMidnight'
import DesktopGraphicsContainer from './graphics/desktop/DesktopGraphicsContainer'
import TabletGraphicsContainer from './graphics/tablet/TabletGraphicsContainer'

// eslint-disable-next-line no-unused-vars
const AppContainer = styled(Box)(({ theme, backgroundColor }) => ({
	width: '100vw',
	height: '100vh',
	overflow: 'hidden',
	backgroundColor,
}))

const fetchWeatherAndSetState = async (setWeatherState) => {
	const currentTime = Math.floor(Date.now() / 1000)
	let weatherCodeIndex = null
	try {
		const weatherResponse = await fetch(
			'https://api.open-meteo.com/v1/forecast?latitude=40.6782&longitude=-73.9442&hourly=temperature_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&forecast_days=1'
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
		const currentWeather = {}
		currentWeather.conditions = getWeatherDescription(
			weatherData.hourly.weather_code[weatherCodeIndex]
		)
		currentWeather.temperature =
			weatherData.hourly.temperature_2m[weatherCodeIndex]
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
		setDistanceFromMidnight,
		setWeatherData,
		setFontColor,
		setIsDesktop,
		setIsMobile,
		setIsTablet,
	} = useContext(AppContext)
	const theme = useTheme()
	const isDesktop = useMediaQuery(theme.breakpoints.up('lg')) // Large screens
	const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg')) // Medium screens
	const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Small screens

	useEffect(() => {
		const calculatedDistanceFromMidnight = getDistanceFromMidnight(
			amountOfDayComplete()
		)
		const strokeColor = getIntermediateColor(
			calculatedDistanceFromMidnight,
			theme.customValues,
			'stroke'
		)
		const backgroundColorToSet = getIntermediateColor(
			calculatedDistanceFromMidnight,
			theme.customValues,
			'background'
		)
		setDistanceFromMidnight(calculatedDistanceFromMidnight)
		setBackgroundColor(backgroundColorToSet)
		setStrokeColor(strokeColor)
		setFontColor(strokeColor)
		fetchWeatherAndSetState(setWeatherData)
	}, [])

	useEffect(() => {
		setIsDesktop(isDesktop)
		setIsMobile(isMobile)
		setIsTablet(isTablet)
	}, [isDesktop, isMobile, isTablet])

	const handleHourChange = (event, newValue) => {
		const distanceFromMidnight = getDistanceFromMidnight(newValue)
		const strokeColor = getIntermediateColor(
			distanceFromMidnight,
			theme.customValues,
			'stroke'
		)

		setBackgroundColor(
			getIntermediateColor(
				distanceFromMidnight,
				theme.customValues,
				'background'
			)
		)
		setStrokeColor(strokeColor)
		setFontColor(strokeColor)
	}

	const renderLayout = () => {
		if (isDesktop) {
			return <DesktopGraphicsContainer />
		} else if (isTablet) {
			return <TabletGraphicsContainer />
		} else if (isMobile) {
			// return <MobileLayout />
		}
	}

	return (
		<Router>
			<AppContainer backgroundColor={backgroundColor} className="App">
				<CssBaseline />
				{renderLayout()}
				<Navigation />
				<StyledSlider
					defaultValue={amountOfDayComplete()}
					onChange={handleHourChange}
				/>
				<InformationContainer>
					<Routes>
						<Route element={<HomePage />} path="/" />
						<Route element={<AboutPage />} path="/about" />
						<Route element={<ExperiencePage />} path="/experience" />
						<Route element={<ErrorPage />} path="*" />
					</Routes>
				</InformationContainer>
			</AppContainer>
		</Router>
	)
}

export default App
