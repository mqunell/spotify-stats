import { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'querystring';
import { deleteCookie, setCookie } from 'cookies-next';
import axios from 'axios';

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, STATE_KEY } = process.env;

const url = 'https://accounts.spotify.com/api/token';

const axiosData = (code: string) => {
	return stringify({
		code,
		grant_type: 'authorization_code',
		redirect_uri: REDIRECT_URI,
		json: true,
	});
};

const axiosConfig = {
	headers: {
		Authorization:
			'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
	},
};

// Receive the auth token and redirect the user to '/'
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { code, state } = req.query;

	if (!state || state !== req.cookies[STATE_KEY]) {
		setCookie('error', 'State mismatch', { req, res });
		res.redirect('/');
		return;
	}

	deleteCookie(STATE_KEY, { req, res });

	try {
		const spotifyRes = await axios.post(url, axiosData(code as string), axiosConfig);
		const { access_token, refresh_token } = spotifyRes.data;

		// Put the tokens and user data on res
		setCookie('accessToken', access_token, { req, res });
		setCookie('refreshToken', refresh_token, { req, res });

		res.redirect('/');
	} catch (error) {
		console.error('error with /api/token');
	}
};

export default handler;
