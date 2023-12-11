import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
	const error = useRouteError()
	console.error(error)

	return <p>TO be error page</p>
}

export default ErrorPage
