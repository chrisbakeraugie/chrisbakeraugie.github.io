const amountOfDayComplete = () => {
	const hour = new Date().getHours()
	return Math.trunc((hour / 24) * 100)
}

export default amountOfDayComplete
