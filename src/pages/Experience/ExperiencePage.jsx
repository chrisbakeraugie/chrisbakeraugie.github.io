import { Typography } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../../context'
import ExperienceCard from '../../components/ExperienceCard'

const ExperiencePage = () => {
	const { fontColor } = useContext(AppContext)
	return (
		<>
			<Typography variant="h3" fontWeight="light" color={fontColor}>
				Recent Work
			</Typography>
			<ExperienceCard
				imageSrc="EdisenCompanyLogo.jpeg"
				organization="Edisen"
				role="Full Stack Developer"
			/>
			<ExperienceCard
				imageSrc="ThriveCompanyLogo.jpeg"
				organization="Thrive Networks"
				role="Developer Consultant - Full stack"
			/>
			<ExperienceCard
				imageSrc="CyientCompanyLogo.jpeg"
				organization="Cyient"
				role="Software Developer"
			/>
		</>
	)
}

export default ExperiencePage
