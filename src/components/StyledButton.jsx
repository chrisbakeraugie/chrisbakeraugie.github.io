import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledButton = styled(Button)(({ theme, fontColor }) => ({
	color: fontColor ? fontColor : 'white',
	fontWeight: theme.typography.fontWeightBold,
}))

export default StyledButton
