import interpolateColor from './interpolateColor'
import parseRGBA from './parseRGBA'

// const colorStops = {
// 	0: { r: 10, g: 25, b: 47, a: 1 }, // Midnight - 0%
// 	40: { r: 10, g: 25, b: 47, a: 1 }, // Still Midnight - 40%
// 	70: { r: 25, g: 55, b: 255, a: 1 }, // Morning - 70%
// 	100: { r: 121, g: 235, b: 255, a: 1 }, // Noon - 100%
// }

function getIntermediateColor(percentage, themeColors) {
	let startColorPercentage = 0
	let endColorPercentage = 100

	const colorStops = {
		0: parseRGBA(themeColors.midnight.background),
		40: parseRGBA(themeColors.midnight.background),
		70: parseRGBA(themeColors.morning.background),
		100: parseRGBA(themeColors.noon.background),
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
