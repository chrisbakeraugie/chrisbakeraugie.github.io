import { Typography } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../../context'

const AboutPage = () => {
	const { fontColor } = useContext(AppContext)
	return (
		<>
			<Typography variant="h3" fontWeight="light" color={fontColor}>
				About Me
			</Typography>
			<Typography variant="p" color={fontColor}>
				{
					'I\'m a developer based in Brooklyn, New York. I work mainly with Node stack technologies, and have spent the last several years focusing on developing full stack applications in a variety of contexts. Im passionate about well made products and creating maintainable code.'
				}
			</Typography>
		</>
	)
}

export default AboutPage
