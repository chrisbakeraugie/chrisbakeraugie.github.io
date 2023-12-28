import { Typography } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../context'

const AboutPage = () => {
	const { fontColor } = useContext(AppContext)
	return (
		<>
			<Typography color={fontColor} variant="h3">
				About Me
			</Typography>
			<Typography color={fontColor} variant="p">
				{
					"I'm a developer based in Brooklyn, New York. I work mainly with Node stack technologies, and have spent the last several years focusing on developing full stack applications in a variety of contexts. Im passionate about well made products and creating maintainable code."
				}
			</Typography>
		</>
	)
}

export default AboutPage
