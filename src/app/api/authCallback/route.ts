import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { stringify } from 'querystring'
import { deleteCookie, getCookie, setCookie } from '@/lib/cookies'

const { CLIENT_ID, CLIENT_SECRET, STATE_KEY, ROOT_URL } = process.env

// Receive the auth token and redirect the user to '/'
export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url)
	const code = searchParams.get('code')
	const state = searchParams.get('state')
	const stateCookie = await getCookie(STATE_KEY!)

	if (!state || state !== stateCookie) {
		await setCookie('error', 'State mismatch')
		return NextResponse.redirect(ROOT_URL!)
	}

	await deleteCookie(STATE_KEY!)

	try {
		const spotifyRes = await axios.post(
			'https://accounts.spotify.com/api/token',
			stringify({
				code,
				grant_type: 'authorization_code',
				redirect_uri: `${ROOT_URL}api/authCallback`,
				json: true,
			}),
			{
				headers: {
					Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
				},
			},
		)
		const { access_token, refresh_token } = spotifyRes.data

		await setCookie('accessToken', access_token)
		await setCookie('refreshToken', refresh_token)

		return NextResponse.redirect(ROOT_URL!)
	} catch (error) {
		console.error('error with /api/token')
	}
}
