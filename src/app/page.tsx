import Directory from '@/components/Directory'
import Login from '@/components/Login'
import { deleteCookie, getCookie } from '@/lib/cookies'

const Home = async () => {
	const accessToken = await getCookie('accessToken')
	const refreshToken = await getCookie('refreshToken')
	const error = await getCookie('error')

	const logout = async () => {
		'use server'
		await deleteCookie('accessToken')
		await deleteCookie('refreshToken')
	}

	if (!accessToken) {
		return (
			<>
				{error && <p>{error}</p>}
				<Login />
			</>
		)
	}

	return <Directory accessToken={accessToken} logout={logout} />
}

export default Home
