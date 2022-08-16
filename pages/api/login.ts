import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import { stringify } from 'querystring';

const { CLIENT_ID, REDIRECT_URI, STATE_KEY } = process.env;
const scope = 'playlist-read-private';

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
const handler = (req: NextApiRequest, res: NextApiResponse): void => {
	const state = generateRandomString(16);

	setCookie(STATE_KEY, state, { req, res });

	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			stringify({
				response_type: 'code',
				client_id: CLIENT_ID,
				scope,
				redirect_uri: REDIRECT_URI,
				state,
			})
	);
};

export default handler;
