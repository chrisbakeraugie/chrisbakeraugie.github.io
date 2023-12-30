function interpolateColor(color1, color2, factor) {
	return {
		r: Math.round(color1.r + factor * (color2.r - color1.r)), // "Interpolating" the colors, weighting theme by a factor
		g: Math.round(color1.g + factor * (color2.g - color1.g)),
		b: Math.round(color1.b + factor * (color2.b - color1.b)),
		a: color1.a + factor * (color2.a - color1.a),
	}
}
export default interpolateColor
