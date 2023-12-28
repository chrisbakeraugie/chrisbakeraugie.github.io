import { Card, CardActions, CardContent, Typography } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../context'
import { styled } from '@mui/material/styles'
import StyledButton from './StyledButton'

const StyledCard = styled(Card)(({ theme }) => ({
	width: '80%',
	height: '80%',
	display: 'flex',
	backgroundColor: 'transparent',
	boxShadow: 'none',
	alignItems: 'center',
	[theme.breakpoints.down('sm')]: {
		flexDirection: 'column',
		width: '100%',
	},
}))

const StyledCardMediaDiv = styled('div')(({ theme }) => ({
	display: 'flex',
	width: 'auto',
	height: '100%',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	[theme.breakpoints.down('sm')]: {
		flexDirection: 'row-reverse',
	},
}))

const TitleTypography = styled(Typography)(({ theme }) => ({
	padding: theme.spacing(1),
	marginBottom: theme.spacing(2),
	[theme.breakpoints.down('sm')]: {
		fontSize: 35,
	},
}))

const ContentTypography = styled(Typography)(({ theme }) => ({
	padding: theme.spacing(1),
	[theme.breakpoints.down('sm')]: {
		fontSize: 15,
	},
}))

const StyledImg = styled('img')(({ theme }) => ({
	height: '100%',
	objectFit: 'contain',
	borderRadius: 8,
	[theme.breakpoints.down('sm')]: {
		height: 100,
	},
}))

const Experience = ({
	role,
	organization,
	description,
	imageSrc,
	onButtonClick,
}) => {
	const { fontColor, isMobile } = useContext(AppContext)
	return (
		<StyledCard>
			{!isMobile && (
				<StyledCardMediaDiv>
					<StyledImg alt={organization} src={imageSrc} />
					<CardActions>
						<StyledButton
							fontColor={fontColor}
							variant="outlined"
							onClick={onButtonClick}
						>
							Back
						</StyledButton>
					</CardActions>
				</StyledCardMediaDiv>
			)}
			<CardContent>
				<TitleTypography color={fontColor} variant="h3">
					{role} at {organization}
				</TitleTypography>
				<ContentTypography color={fontColor} variant="p">
					{description}
				</ContentTypography>
			</CardContent>
			{isMobile && (
				<CardActions>
					<StyledButton
						fontColor={fontColor}
						variant="outlined"
						onClick={onButtonClick}
					>
						Back
					</StyledButton>
				</CardActions>
			)}
		</StyledCard>
	)
}

export default Experience
