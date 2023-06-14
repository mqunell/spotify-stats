import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { stringify } from 'querystring';

const { CLIENT_ID, CLIENT_SECRET, STATE_KEY } = process.env;

// Receive the auth token and redirect the user to '/'
export const GET = async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);
	const code = searchParams.get('code');
	const state = searchParams.get('state');

	const baseUrl = 'http://localhost:3000/'; // `${req.nextUrl.protocol}${req.nextUrl.host}/`;

	if (!state || state !== cookies().get(STATE_KEY as string)?.value) {
		cookies().set('error', 'State mismatch');
		return NextResponse.redirect(baseUrl);
	}

	// Delete the cookie
	cookies().set(STATE_KEY as string, '', { maxAge: 0 });

	try {
		const spotifyRes = await axios.post(
			'https://accounts.spotify.com/api/token',
			stringify({
				code,
				grant_type: 'authorization_code',
				redirect_uri: 'http://localhost:3000/api/authCallback',
				json: true,
			}),
			{
				headers: {
					Authorization:
						'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
				},
			}
		);
		const { access_token, refresh_token } = spotifyRes.data;

		// Set a 2 hour expiration on the access token
		cookies().set('accessToken', access_token, { maxAge: 60 * 60 * 2 });
		cookies().set('refreshToken', refresh_token);

		return NextResponse.redirect(baseUrl);
	} catch (error) {
		console.error('error with /api/token');
	}
};
