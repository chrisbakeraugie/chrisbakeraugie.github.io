import { Card, CardActions, CardContent, Typography } from '@mui/material'
import { useContext } from 'react'
import { AppContext } from '../context'
import { styled } from '@mui/material/styles'
import StyledButton from './StyledButton'

const StyledCard = styled(Card)(() => ({
	width: '80%',
	height: '80%',
	display: 'flex',
	backgroundColor: 'transparent',
	boxShadow: 'none',
	alignItems: 'center',
}))

const StyledCardMediaDiv = styled('div')(() => ({
	display: 'flex',
	width: 'auto',
	height: '100%',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
}))

const TitleTypography = styled(Typography)(({ theme }) => ({
	padding: theme.spacing(1),
	marginBottom: theme.spacing(2),
}))

const ContentTypography = styled(Typography)(({ theme }) => ({
	padding: theme.spacing(1),
}))

const Experience = ({
	role,
	organization,
	description,
	imageSrc,
	onButtonClick,
}) => {
	const { fontColor } = useContext(AppContext)
	return (
		<StyledCard>
			<StyledCardMediaDiv>
				<img
					alt={organization}
					src={imageSrc}
					style={{ height: '100%', objectFit: 'contain' }}
				/>
				<CardActions>
					<StyledButton fontColor={fontColor} onClick={onButtonClick}>
						Back
					</StyledButton>
				</CardActions>
			</StyledCardMediaDiv>
			<CardContent>
				<TitleTypography color={fontColor} variant="h3">
					{role} at {organization}
				</TitleTypography>
				<ContentTypography color={fontColor} variant="p">
					{description}
				</ContentTypography>
			</CardContent>
		</StyledCard>
	)
}

export default Experience
