import { Typography } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../../context'

const HomePage = () => {
	const { fontColor, isMobile } = useContext(AppContext)
	return (
		<>
			{isMobile ? (
				<>
					<Typography color={fontColor} variant="h2">
						Chris Baker
					</Typography>
					<Typography color={fontColor} variant="h2">
						Full-stack Developer
					</Typography>
				</>
			) : (
				<Typography color={fontColor} variant="h2">
					Chris Baker - Full-stack Developer
				</Typography>
			)}
		</>
	)
}

export default HomePage
