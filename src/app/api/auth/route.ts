import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { stringify } from 'querystring';

const { CLIENT_ID, STATE_KEY, ROOT_URL } = process.env;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length: number): string => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

// Create the auth request and redirect the user
export const GET = async (): Promise<NextResponse> => {
	const state = generateRandomString(16);

	cookies().set(STATE_KEY as string, state);

	return NextResponse.redirect(
		'https://accounts.spotify.com/authorize?' +
			stringify({
				response_type: 'code',
				client_id: CLIENT_ID,
				scope: 'playlist-read-private',
				redirect_uri: `${ROOT_URL}api/authCallback`,
				state,
			})
	);
};
