import interpolateColor from './interpolateColor'
import parseRGBA from './parseRGBA'

function getIntermediateColor(percentage, themeColors, fieldName) {
	let startColorPercentage = 0
	let endColorPercentage = 100

	const colorStops = {
		0: parseRGBA(themeColors.midnight[fieldName]),
		33: parseRGBA(themeColors.midnight[fieldName]),
		80: parseRGBA(themeColors.morning[fieldName]),
		100: parseRGBA(themeColors.noon[fieldName]),
	}

	for (let stop in colorStops) {
		if (percentage >= stop) startColorPercentage = stop
		else {
			endColorPercentage = stop
			break
		}
	}

	const startColor = colorStops[startColorPercentage]
	const endColor = colorStops[endColorPercentage]
	let factor =
		endColorPercentage - startColorPercentage > 0
			? (percentage - startColorPercentage) / // eslint-disable-next-line no-mixed-spaces-and-tabs
				(endColorPercentage - startColorPercentage)
			: 100

	const interpolatedColor = interpolateColor(startColor, endColor, factor)
	return `rgba(${interpolatedColor.r}, ${interpolatedColor.g}, ${interpolatedColor.b}, ${interpolatedColor.a})`
}

export default getIntermediateColor
