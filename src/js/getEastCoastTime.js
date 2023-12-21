const getEastCoastTime = () => {
	const now = new Date()
	const easternTime = now.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	})
	const easternDate = new Date(easternTime)
	const formattedTime = easternDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	})

	return formattedTime
}
export default getEastCoastTime
