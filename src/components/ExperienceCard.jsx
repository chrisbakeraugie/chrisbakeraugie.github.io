import { styled } from '@mui/material/styles'
import { Typography, Card, CardMedia, CardContent } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../context'

const StyledExperienceCard = styled(Card)(({ fontColor }) => ({
	display: 'flex',
	width: '70%',
	height: 70,
	backgroundColor: 'transparent',
	boxShadow: 'none',
	border: '2px solid',
	borderColor: fontColor,
	color: fontColor,
	transition: 'transform 0.3s ease-in-out',
	'&:hover': {
		transform: 'translateY(-4px)',
		cursor: 'pointer',
	},
}))

const StyledCardMedia = styled(CardMedia)(() => ({
	width: 'auto',
	height: '100%',
	objectFit: 'cover',
}))

const StyledCardContent = styled(CardContent)(() => ({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignContent: 'center',
}))

const ExperienceCard = ({ imageSrc, organization, role, onClick }) => {
	const { fontColor } = useContext(AppContext)

	return (
		<StyledExperienceCard fontColor={fontColor} onClick={onClick}>
			<StyledCardMedia component={'img'} image={imageSrc} />
			<StyledCardContent>
				<Typography variant="h5" fontWeight="bold">
					{organization}
				</Typography>
				<Typography variant="p">{role}</Typography>
			</StyledCardContent>
		</StyledExperienceCard>
	)
}

export default ExperienceCard
