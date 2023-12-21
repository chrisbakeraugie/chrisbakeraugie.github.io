import { Typography } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../../context'

const HomePage = () => {
	const { fontColor } = useContext(AppContext)
	return (
		<>
			<Typography color={fontColor} variant="h2">
				Chris Baker - Full-stack Developer
			</Typography>
		</>
	)
}

export default HomePage
