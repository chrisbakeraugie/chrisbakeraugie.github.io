import { Box, CssBaseline } from '@mui/material'
import ErrorPage from './pages/Error/ErrorPage'
import HomePage from './pages/Home/HomePage'
import GraphicsContainer from './graphics/desktop/GraphicsContainer'
import amountOfDayComplete from './js/amountOfDayComplete'
import { useContext, useEffect } from 'react'
import getIntermediateColor from './js/getIntermediateColor'
import getDistanceFromNoon from './js/getDistanceFromNoon'
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
		const calculatedDistanceFromNoon = getDistanceFromNoon(
			amountOfDayComplete()
		)
		const strokeColor = getIntermediateColor(
			calculatedDistanceFromNoon,
			theme.customValues,
			'stroke'
		)
		const backgroundColorToSet = getIntermediateColor(
			calculatedDistanceFromNoon,
			theme.customValues,
			'background'
		)
		setDistanceFromNoon(calculatedDistanceFromNoon)
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
		const distanceFromNoon = getDistanceFromNoon(newValue)
		const strokeColor = getIntermediateColor(
			distanceFromNoon,
			theme.customValues,
			'stroke'
		)

		setBackgroundColor(
			getIntermediateColor(distanceFromNoon, theme.customValues, 'background')
		)
		setStrokeColor(strokeColor)
		setFontColor(strokeColor)
	}

	const renderLayout = () => {
		if (isDesktop) {
			return <GraphicsContainer />
			// Make Desktop version
		} else if (isTablet) {
			// return <TabletLayout />
		} else if (isMobile) {
			// return <MobileLayout />
		}
	}

	return (
		<Router>
			<AppContainer className="App" backgroundColor={backgroundColor}>
				<CssBaseline />
				{renderLayout()}
				<Navigation />
				<StyledSlider
					onChange={handleHourChange}
					defaultValue={amountOfDayComplete()}
				/>
				<InformationContainer>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/experience" element={<ExperiencePage />} />
						{/* Assuming you have an ExperiencePage component */}
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</InformationContainer>
			</AppContainer>
		</Router>
	)
}

export default App
