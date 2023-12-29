import { Box, CssBaseline } from '@mui/material'
import amountOfDayComplete from './js/amountOfDayComplete'
import { useContext, useEffect } from 'react'
import getIntermediateColor from './js/getIntermediateColor'
import { AppContext } from './context'
import { useTheme } from '@emotion/react'
import { styled } from '@mui/material/styles'
import getWeatherDescription from './js/getWeatherDescription'
import useMediaQuery from '@mui/material/useMediaQuery'
import StyledSlider from './components/StyledSlider'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom'
import InformationContainer from './components/InformationContainer'
import getDistanceFromMidnight from './js/getDistanceFromMidnight'
import DesktopGraphicsContainer from './graphics/DesktopGraphicsContainer'
import TabletGraphicsContainer from './graphics/TabletGraphicsContainer'
import MobileGraphicsContainer from './graphics/MobileGraphicsContainer'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ExperiencePage from './pages/ExperiencePage'
import ErrorPage from './pages/ErrorPage'
import Navigation from './components/Navigation'
import getRandomWeatherConditions from './js/getRandomWeatherConditions'

const AppContainer = styled(Box)(({ theme, backgroundColor }) => ({
	width: '100vw',
	height: '100vh',
	overflow: 'hidden',
	backgroundColor,
	[theme.breakpoints.down('sm')]: {
		height: '90vh',
	},
}))

const fetchWeatherAndSetState = async (setWeatherState) => {
	const currentTime = Math.floor(Date.now() / 1000)
	let weatherCodeIndex = null
	try {
		const weatherResponse =
			process.env.NODE_ENV !== 'development'
				? await fetch(
						'https://api.open-meteo.com/v1/forecast?latitude=40.6782&longitude=-73.9442&hourly=temperature_2m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime&forecast_days=1&timezone=America%2FNew_York'
					)
				: null
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
		if (process.env.NODE_ENV) {
			setWeatherState(getRandomWeatherConditions())
		}
		console.error('Weather data failed to load:', JSON.stringify(err))
	}
}
const Layout = ({ isMobile, isTablet, isDesktop }) => {
	const location = useLocation()

	const renderLayout = () => {
		if (isDesktop) {
			return <DesktopGraphicsContainer />
		} else if (isTablet) {
			return <TabletGraphicsContainer />
		} else if (isMobile) {
			if (location.pathname === '/experience') return
			return <MobileGraphicsContainer />
		}
	}
	return renderLayout()
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
	const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
	const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'))
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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

	return (
		<Router>
			<AppContainer backgroundColor={backgroundColor} className="App">
				<CssBaseline />
				<Layout isDesktop={isDesktop} isMobile={isMobile} isTablet={isTablet} />
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
						<Route element={<ContactPage />} path="/contact" />
						<Route element={<ErrorPage />} path="*" />
					</Routes>
				</InformationContainer>
			</AppContainer>
		</Router>
	)
}

export default App
