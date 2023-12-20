import { useState } from 'react'
import ExperienceCard from '../../components/ExperienceCard'
import Experience from '../../components/Experience'

const experienceOptions = [
	{
		id: 1,
		imageSrc: 'EdisenCompanyLogo.jpeg',
		role: 'Full Stack Developer',
		organization: 'Edisen',
		description: `Integral in the development of the product, focusing on the reliable implementation of new
		features, bug fixes, and hotfixes on frontend and backend. Brought several application features
		from concept to deployment, ensuring functionality and user satisfaction. Proficient in
		addressing complex challenges and enhancing product performance.`,
	},
	{
		id: 2,
		imageSrc: 'ThriveCompanyLogo.jpeg',
		role: 'Developer Consultant - Full stack',
		organization: 'Thrive Networks',
		description: `Expertly navigated client visions, transforming abstract ideas into compelling, user-centric
		digital experiences as a Frontend Developer. Excelled in bridging the gap between concept and
		reality, ensuring each solution was not only viable but also meticulously tailored to meet the
		specific needs of each client.`,
	},
	{
		id: 3,
		imageSrc: 'CyientCompanyLogo.jpeg',
		role: 'Software Developer',
		organization: 'Cyient',
		description: `Met with clients to discuss business needs, clarify SOW requirements, and manage expectations
		from inception to execution. Developed, enhanced, and maintained various SharePoint-based
		applications for engineering, research, testing, and related files management.`,
	},
	{
		id: 4,
		imageSrc: 'AugustanaCollegeLogo.jpeg',
		role: 'B.A. Class of 2019',
		organization: 'Augustana College',
		description: `Graduated in the class of 2019 with a Bachelor of Arts in Engineering Physics.
		 Spent considerable time in classes related to Computer Science, including several classes related to Software Development`,
	},
]

const ExperiencePage = () => {
	const [selectedItem, setSelectedItem] = useState(null)

	const handleItemClick = (itemId) => {
		setSelectedItem(experienceOptions.find((item) => item.id === itemId))
	}

	const handleCloseExperience = () => {
		setSelectedItem(null)
	}

	return (
		<>
			{selectedItem ? (
				<Experience
					role={selectedItem.role}
					organization={selectedItem.organization}
					description={selectedItem.description}
					imageSrc={selectedItem.imageSrc}
					onButtonClick={handleCloseExperience}
				/>
			) : (
				experienceOptions.map((item) => (
					<ExperienceCard
						key={item}
						imageSrc={item.imageSrc}
						organization={item.organization}
						role={item.role}
						onClick={() => handleItemClick(item.id)}
					/>
				))
			)}
		</>
	)
}

export default ExperiencePage
