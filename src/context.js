import { createContext, useState } from 'react'

export const AppContext = createContext({
	isLoading: false,
	setIsLoading: () => {},
	isError: false,
	setIsError: () => {},
	backgroundColor: '',
	setBackgroundColor: () => {},
	strokeColor: '',
	setStrokeColor: () => {},
	distanceFromMidnight: 0,
	setDistanceFromMidnight: () => {},
	weatherData: '',
	setWeatherData: () => {},
	fontColor: '',
	setFontColor: () => {},
	isDesktop: false,
	setIsDesktop: () => {},
	isTablet: false,
	setIsTablet: () => {},
	isMobile: false,
	setIsMobile: () => {},
	location: '',
	setLocation: () => {},
})

export const AppProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [backgroundColor, setBackgroundColor] = useState('rgba(255,255,255,1)')
	const [strokeColor, setStrokeColor] = useState('rgba(185,180,44,1)')
	const [distanceFromMidnight, setDistanceFromMidnight] = useState(0)
	const [weatherData, setWeatherData] = useState('')
	const [fontColor, setFontColor] = useState('')
	const [isDesktop, setIsDesktop] = useState('')
	const [isMobile, setIsMobile] = useState('')
	const [isTablet, setIsTablet] = useState('')
	// Add city selector?
	const [location, setLocation] = useState('Brooklyn, New York')

	return (
		<AppContext.Provider
			value={{
				isLoading,
				setIsLoading,
				isError,
				setIsError,
				backgroundColor,
				setBackgroundColor,
				strokeColor,
				setStrokeColor,
				distanceFromMidnight,
				setDistanceFromMidnight,
				weatherData,
				setWeatherData,
				fontColor,
				setFontColor,
				isDesktop,
				setIsDesktop,
				isTablet,
				setIsTablet,
				isMobile,
				setIsMobile,
				location,
				setLocation,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export default AppProvider
