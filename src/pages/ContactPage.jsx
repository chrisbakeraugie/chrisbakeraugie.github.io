import React, { useState, useContext } from 'react'
import { Card, TextField, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { AppContext } from '../context'
import StyledButton from '../components/StyledButton'

const StyledContactCard = styled(Card)(({ theme, fontColor }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: theme.spacing(4),
	width: '70%',
	backgroundColor: 'transparent',
	boxShadow: 'none',
	border: '2px solid',
	borderColor: fontColor,
	color: fontColor,
	[theme.breakpoints.down('sm')]: {
		width: '90%',
		maxHeight: 350,
	},
}))

const StyledForm = styled('form')({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	gap: '20px',
})

const StyledTextField = styled(TextField)(({ theme, fontColor }) => ({
	'& label.Mui-focused': {
		color: fontColor,
	},
	'& label': {
		color: fontColor,
	},
	'& .MuiOutlinedInput-root': {
		color: fontColor,
		'& fieldset': {
			borderColor: fontColor,
		},
		'&:hover fieldset': {
			borderColor: fontColor,
		},
		'&.Mui-focused fieldset': {
			borderColor: fontColor,
		},
	},
}))

const StyledTypography = styled(Typography)(({ fontColor, theme }) => ({
	color: fontColor,
	[theme.breakpoints.down('sm')]: {
		fontSize: 15,
	},
}))

const ContactPage = () => {
	const { fontColor } = useContext(AppContext)
	const [status, setStatus] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const submitForm = async (ev) => {
		ev.preventDefault()
		try {
			const formData = new FormData()
			formData.append('email', email)
			formData.append('message', message)

			const response = await fetch('https://formspree.io/xgekkjeo', {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json',
				},
			})

			if (response.ok) {
				setStatus('SUCCESS')
				setEmail('')
				setMessage('')
			} else {
				setStatus('ERROR')
			}
		} catch (error) {
			setStatus('ERROR')
		}
	}

	return (
		<StyledContactCard fontColor={fontColor}>
			<StyledTypography
				gutterBottom
				align="center"
				fontColor={fontColor}
				variant="h5"
			>
				Send me a message, I read them everyday
			</StyledTypography>
			<StyledForm onSubmit={submitForm}>
				<StyledTextField
					required
					fontColor={fontColor}
					label="Your email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<StyledTextField
					multiline
					required
					fontColor={fontColor}
					label="Message"
					rows={4}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				{status === 'SUCCESS' ? (
					<StyledTypography fontColor={fontColor}>
						{"Thanks! I'll respond to you soon."}
					</StyledTypography>
				) : (
					<StyledButton type="submit">Submit</StyledButton>
				)}
				{status === 'ERROR' && (
					<StyledTypography fontColor={fontColor}>
						{
							'There was an error, feel free to send me an email at ChrisBakerDev@gmail.com'
						}
					</StyledTypography>
				)}
			</StyledForm>
		</StyledContactCard>
	)
}

export default ContactPage
