import { createContext, useState } from 'react'

export const AppContext = createContext({
	isLoading: false,
	setIsLoading: () => {},
	isError: false,
	setIsError: () => {},
	backgroundColor: '',
	setBackgroundColor: () => {},
})

export const AppProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [backgroundColor, setBackgroundColor] = useState('rgba(255,255,255,1)')
	return (
		<AppContext.Provider
			value={{
				isLoading,
				setIsLoading,
				isError,
				setIsError,
				backgroundColor,
				setBackgroundColor,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export default AppProvider
