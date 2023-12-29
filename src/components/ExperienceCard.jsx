import { styled } from '@mui/material/styles'
import { Typography, Card, CardMedia, CardContent } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../context'

const StyledExperienceCard = styled(Card)(({ fontColor, backgroundColor }) => ({
	display: 'flex',
	width: '70%',
	height: 70,
	backgroundColor,
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

const StyledExperienceTitle = styled(Typography)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		fontSize: 15,
	},
}))

const StyledExperienceDetails = styled(Typography)(({ theme }) => ({
	[theme.breakpoints.down('sm')]: {
		fontSize: 12,
	},
}))

const ExperienceCard = ({ imageSrc, organization, role, onClick }) => {
	const { fontColor, backgroundColor } = useContext(AppContext)

	return (
		<StyledExperienceCard
			backgroundColor={backgroundColor}
			fontColor={fontColor}
			onClick={onClick}
		>
			<StyledCardMedia component={'img'} image={imageSrc} />
			<StyledCardContent>
				<StyledExperienceTitle fontWeight="bold" variant="h5">
					{organization}
				</StyledExperienceTitle>
				<StyledExperienceDetails variant="p">{role}</StyledExperienceDetails>
			</StyledCardContent>
		</StyledExperienceCard>
	)
}

export default ExperienceCard
