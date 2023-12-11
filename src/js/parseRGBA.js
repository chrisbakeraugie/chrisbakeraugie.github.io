function parseRGBA(rgbaString) {
	const matches = rgbaString.match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/)
	return {
		r: parseInt(matches[1], 10),
		g: parseInt(matches[2], 10),
		b: parseInt(matches[3], 10),
		a: parseFloat(matches[4]),
	}
}
export default parseRGBA
