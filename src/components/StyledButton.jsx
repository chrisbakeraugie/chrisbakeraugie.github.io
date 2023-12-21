import { Button } from '@mui/material'

const StyledButton = ({ fontColor, ...props }) => (
	<Button
		{...props}
		sx={{
			color: fontColor || 'white',
			...props.sx,
			fontWeight: 'bold',
			borderColor: fontColor || 'white',
		}}
	/>
)

export default StyledButton
