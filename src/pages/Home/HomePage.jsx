import { Typography } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../../context'

const HomePage = () => {
	const { fontColor } = useContext(AppContext)
	return (
		<>
			<Typography variant="h2" fontWeight="light" color={fontColor}>
				Chris Baker - Full-stack Developer
			</Typography>
		</>
	)
}

export default HomePage
